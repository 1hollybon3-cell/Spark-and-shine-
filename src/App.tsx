/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PriceCards } from './components/PriceCards';
import { LoyaltyTracker } from './components/LoyaltyTracker';
import { Calculator } from './components/Calculator';
import { CoverageArea } from './components/CoverageArea';
import { ServiceFeatures } from './components/ServiceFeatures';
import { Reviews } from './components/Reviews';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BookingModal } from './components/BookingModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WASH_PRODUCTS, WashProduct } from './data/carWashData';
import { CustomerRecord } from './utils/customerRecords';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>('sedan-hatchback');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);
  const [detailProduct, setDetailProduct] = useState<WashProduct | null>(null);

  // Deep linking support for the routes specified in the prompt:
  // /products/spark-shine-sedan-hatchback
  // /products/spark-shine-suv-bakkie
  // /products/spark-shine-taxi-minibus
  // /products/spark-shine-truck-wash
  useEffect(() => {
    const handleUrlRouting = () => {
      const path = window.location.pathname.toLowerCase();
      const matched = WASH_PRODUCTS.find((p) => path.includes(p.slug));
      if (matched) {
        setSelectedProductId(matched.id);
        setBookingModalOpen(true);
      }
    };

    handleUrlRouting();
    window.addEventListener('popstate', handleUrlRouting);
    return () => window.removeEventListener('popstate', handleUrlRouting);
  }, []);

  const handleOpenBooking = (productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
      const prod = WASH_PRODUCTS.find(p => p.id === productId);
      if (prod && window.history?.pushState) {
        window.history.pushState(null, '', `/products/${prod.slug}`);
      }
    }
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
    setSelectedCustomer(null);
    if (window.history?.pushState && window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
  };

  const handleOpenBookingWithCustomer = (customer: CustomerRecord) => {
    setSelectedCustomer(customer);
    const prod = WASH_PRODUCTS.find(p => p.id === customer.preferredProduct);
    if (prod) {
      setSelectedProductId(prod.id);
    }
    setBookingModalOpen(true);
  };

  const handleSelectProduct = (product: WashProduct) => {
    setSelectedProductId(product.id);
    if (window.history?.pushState) {
      window.history.pushState(null, '', `/products/${product.slug}`);
    }
    setBookingModalOpen(true);
  };

  const handleOpenDetails = (product: WashProduct) => {
    setDetailProduct(product);
  };

  const handleBookFromDetails = (product: WashProduct) => {
    setDetailProduct(null);
    handleSelectProduct(product);
  };

  const handleSelectAreaForBooking = (areaName: string) => {
    setBookingModalOpen(true);
  };

  const handleNavigateSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Top Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onNavigateSection={handleNavigateSection}
        />

        {/* Primary Pricing Grid: Sedan R70, SUV/Bakkie R100, Taxi R110, Truck R150 */}
        <PriceCards
          onSelectProduct={handleSelectProduct}
          onOpenDetails={handleOpenDetails}
        />

        {/* VIP Loyalty Rewards: Wash 4 Times, Get 5th FREE */}
        <LoyaltyTracker
          onOpenBookingWithCustomer={handleOpenBookingWithCustomer}
          onOpenGeneralBooking={() => handleOpenBooking()}
        />

        {/* Multi-Vehicle Combo Calculator */}
        <Calculator />

        {/* Bushbuckridge Villages Covered Map */}
        <CoverageArea
          onSelectAreaForBooking={handleSelectAreaForBooking}
        />

        {/* Service Inclusions & Self-Sufficiency Features */}
        <ServiceFeatures />

        {/* Customer Reviews & Bushbuckridge Feedback */}
        <Reviews />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onNavigateSection={handleNavigateSection}
      />

      {/* Floating & Mobile WhatsApp Bar */}
      <FloatingWhatsApp
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Interactive Booking & WhatsApp Dispatch Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        initialProductId={selectedProductId}
      />

      {/* Vehicle Package Inclusions Detail Modal */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onBookNow={handleBookFromDetails}
      />
    </div>
  );
}
