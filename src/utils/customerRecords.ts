export interface WashHistoryItem {
  id: string;
  reference: string;
  date: string;
  vehicleName: string;
  vehicleCode: string;
  price: number;
  village: string;
  standNumber?: string;
  isFreeWash?: boolean;
}

export interface CustomerRecord {
  phone: string;
  name: string;
  village: string;
  addressDetails: string;
  vehicleModel: string;
  preferredProduct: string;
  totalWashesCount: number;
  currentStamps: number; // 0 to 4 (at 4, next is 5th free)
  freeWashesEarned: number;
  freeWashesRedeemed: number;
  history: WashHistoryItem[];
  lastWashDate: string;
}

const STORAGE_KEY = 'spark_shine_customer_records_v1';

// Seed initial returning customers from Bushbuckridge
const SEED_CUSTOMERS: CustomerRecord[] = [
  {
    phone: '0721234567',
    name: 'Mama Joyce Mashaba',
    village: 'Thulamahashe Section A',
    addressDetails: 'Stand 204, near Primary School',
    vehicleModel: 'Silver VW Polo TSI',
    preferredProduct: 'sedan-hatchback',
    totalWashesCount: 4,
    currentStamps: 4, // Next wash is 5th FREE!
    freeWashesEarned: 1,
    freeWashesRedeemed: 0,
    lastWashDate: '3 days ago',
    history: [
      { id: 'w-1', reference: 'SNS-BBR-4120', date: '12 Sep 2026', vehicleName: 'Sedan & Hatchback', vehicleCode: 'Vehicle A', price: 70, village: 'Thulamahashe Section A' },
      { id: 'w-2', reference: 'SNS-BBR-5512', date: '20 Sep 2026', vehicleName: 'Sedan & Hatchback', vehicleCode: 'Vehicle A', price: 70, village: 'Thulamahashe Section A' },
      { id: 'w-3', reference: 'SNS-BBR-6844', date: '28 Sep 2026', vehicleName: 'Sedan & Hatchback', vehicleCode: 'Vehicle A', price: 70, village: 'Thulamahashe Section A' },
      { id: 'w-4', reference: 'SNS-BBR-7901', date: '01 Oct 2026', vehicleName: 'Sedan & Hatchback', vehicleCode: 'Vehicle A', price: 70, village: 'Thulamahashe Section A' }
    ]
  },
  {
    phone: '0839876543',
    name: 'Sipho Ndlovu',
    village: 'Dwarsloop Phase 2',
    addressDetails: 'Stand 518, Blue Gate',
    vehicleModel: 'Toyota Hilux Single Cab 2.8',
    preferredProduct: 'suv-bakkie',
    totalWashesCount: 3,
    currentStamps: 3,
    freeWashesEarned: 0,
    freeWashesRedeemed: 0,
    lastWashDate: 'Yesterday',
    history: [
      { id: 'w-5', reference: 'SNS-BBR-3211', date: '15 Sep 2026', vehicleName: 'SUV & Bakkie', vehicleCode: 'Vehicle B', price: 100, village: 'Dwarsloop Phase 2' },
      { id: 'w-6', reference: 'SNS-BBR-4920', date: '23 Sep 2026', vehicleName: 'SUV & Bakkie', vehicleCode: 'Vehicle B', price: 100, village: 'Dwarsloop Phase 2' },
      { id: 'w-7', reference: 'SNS-BBR-6019', date: '03 Oct 2026', vehicleName: 'SUV & Bakkie', vehicleCode: 'Vehicle B', price: 100, village: 'Dwarsloop Phase 2' }
    ]
  },
  {
    phone: '0645551234',
    name: 'Brother Themba',
    village: 'Bushbuckridge Central Taxi Rank',
    addressDetails: 'Quantum Rank Queue Platform 3',
    vehicleModel: 'Toyota Quantum Sesfikile',
    preferredProduct: 'taxi-minibus',
    totalWashesCount: 8,
    currentStamps: 3,
    freeWashesEarned: 1,
    freeWashesRedeemed: 1,
    lastWashDate: '2 days ago',
    history: [
      { id: 'w-8', reference: 'SNS-BBR-8102', date: '29 Sep 2026', vehicleName: 'Taxi (14-16 Seater)', vehicleCode: 'Taxi', price: 110, village: 'Bushbuckridge Central' },
      { id: 'w-9', reference: 'SNS-BBR-8550', date: '01 Oct 2026', vehicleName: 'Taxi (14-16 Seater)', vehicleCode: 'Taxi', price: 110, village: 'Bushbuckridge Central' },
      { id: 'w-10', reference: 'SNS-BBR-9012', date: '02 Oct 2026', vehicleName: 'Taxi (14-16 Seater)', vehicleCode: 'Taxi', price: 110, village: 'Bushbuckridge Central' }
    ]
  }
];

export const normalizePhone = (phone: string): string => {
  return phone.replace(/[^0-9]/g, '');
};

export const getCustomerRecords = (): CustomerRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_CUSTOMERS));
      return SEED_CUSTOMERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_CUSTOMERS;
  } catch (e) {
    return SEED_CUSTOMERS;
  }
};

export const findCustomerByPhone = (phoneInput: string): CustomerRecord | null => {
  const cleaned = normalizePhone(phoneInput);
  if (!cleaned || cleaned.length < 5) return null;
  const records = getCustomerRecords();
  return (
    records.find((c) => {
      const cClean = normalizePhone(c.phone);
      return cClean.includes(cleaned) || cleaned.includes(cClean);
    }) || null
  );
};

export const saveCustomerRecord = (customer: CustomerRecord): void => {
  try {
    const records = getCustomerRecords();
    const cleanPhone = normalizePhone(customer.phone);
    const existingIndex = records.findIndex((c) => normalizePhone(c.phone) === cleanPhone);

    if (existingIndex >= 0) {
      records[existingIndex] = customer;
    } else {
      records.unshift(customer);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save customer record', e);
  }
};

export const recordCompletedWash = (
  phoneInput: string,
  name: string,
  village: string,
  addressDetails: string,
  vehicleModel: string,
  vehicleCode: string,
  vehicleName: string,
  price: number,
  bookingRef: string
): { customer: CustomerRecord; isFifthFreeWash: boolean } => {
  const cleanPhone = normalizePhone(phoneInput) || `cust-${Date.now().toString().slice(-6)}`;
  let customer = findCustomerByPhone(cleanPhone);

  const todayStr = new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' });

  if (!customer) {
    // New Customer First Wash
    customer = {
      phone: phoneInput || cleanPhone,
      name: name || 'Returning Customer',
      village: village || 'Dwarsloop',
      addressDetails: addressDetails || '',
      vehicleModel: vehicleModel || '',
      preferredProduct: vehicleName,
      totalWashesCount: 1,
      currentStamps: 1,
      freeWashesEarned: 0,
      freeWashesRedeemed: 0,
      lastWashDate: todayStr,
      history: [
        {
          id: `w-${Date.now()}`,
          reference: bookingRef,
          date: todayStr,
          vehicleName,
          vehicleCode,
          price,
          village,
          standNumber: addressDetails,
          isFreeWash: false
        }
      ]
    };
    saveCustomerRecord(customer);
    return { customer, isFifthFreeWash: false };
  }

  // Returning Customer
  const isFifthFreeWash = customer.currentStamps === 4;

  let newStamps = customer.currentStamps + 1;
  let freeEarned = customer.freeWashesEarned;
  let freeRedeemed = customer.freeWashesRedeemed;

  if (isFifthFreeWash) {
    // The 5th wash is redeemed for free! Reset stamps to 0
    newStamps = 0;
    freeEarned += 1;
    freeRedeemed += 1;
  }

  const updatedCustomer: CustomerRecord = {
    ...customer,
    name: name || customer.name,
    village: village || customer.village,
    addressDetails: addressDetails || customer.addressDetails,
    vehicleModel: vehicleModel || customer.vehicleModel,
    totalWashesCount: customer.totalWashesCount + 1,
    currentStamps: newStamps,
    freeWashesEarned: freeEarned,
    freeWashesRedeemed: freeRedeemed,
    lastWashDate: todayStr,
    history: [
      {
        id: `w-${Date.now()}`,
        reference: bookingRef,
        date: todayStr,
        vehicleName,
        vehicleCode,
        price: isFifthFreeWash ? 0 : price,
        village,
        standNumber: addressDetails,
        isFreeWash: isFifthFreeWash
      },
      ...customer.history
    ]
  };

  saveCustomerRecord(updatedCustomer);
  return { customer: updatedCustomer, isFifthFreeWash };
};
