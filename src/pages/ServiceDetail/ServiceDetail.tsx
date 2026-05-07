import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  FaCar,
  FaHome,
  FaCouch,
  FaTools,
  FaRegWindowMaximize,
  FaArrowLeft,
  FaCheck,
  FaShoppingCart,
} from 'react-icons/fa';
import { getServiceById } from '../../data/services';
import { useCart } from '../../hooks/useCart';
import { Button } from '../../components/Button/Button';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import type { ReactNode } from 'react';
import type { PricingTier } from '../../types';
import styles from './ServiceDetail.module.css';

/** Map icon string identifiers from data to actual react-icons components. */
const iconMap: Record<string, ReactNode> = {
  FaCar: <FaCar />,
  FaHome: <FaHome />,
  FaCouch: <FaCouch />,
  FaRegWindowMaximize: <FaRegWindowMaximize />,
  FaTools: <FaTools />,
};

export function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const service = serviceId ? getServiceById(serviceId) : undefined;
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(
    service?.tiers[0] ?? null,
  );

  if (!service) {
    return (
      <div className={styles.page}>
        <EmptyState
          icon={<FaTools />}
          title="Service not found"
          message="The service you're looking for doesn't exist."
          actionLabel="Go Home"
          onAction={() => navigate('/app/home')}
        />
      </div>
    );
  }

  const handleBookNow = () => {
    if (!selectedTier) return;
    // Navigate to booking form with service and tier info via state
    navigate('/app/book', {
      state: {
        services: [
          {
            id: `${service.id}-${selectedTier.id}-${Date.now()}`,
            serviceId: service.id,
            serviceName: service.name,
            tierId: selectedTier.id,
            tierName: selectedTier.name,
            price: selectedTier.price,
          },
        ],
      },
    });
  };

  const handleAddToCart = () => {
    if (!selectedTier) return;
    addItem({
      id: `${service.id}-${selectedTier.id}-${Date.now()}`,
      serviceId: service.id,
      serviceName: service.name,
      tierId: selectedTier.id,
      tierName: selectedTier.name,
      price: selectedTier.price,
    });
  };

  return (
    <div className={styles.page}>
      {/* Header with back button */}
      <header className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
      </header>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroIcon} aria-hidden="true">
          {iconMap[service.image] ?? null}
        </div>
        <div className={styles.heroInfo}>
          <h1 className={styles.serviceName}>{service.name}</h1>
          <p className={styles.serviceDuration}>{service.duration}</p>
          <p className={styles.serviceDescription}>{service.description}</p>
        </div>
      </div>

      {/* Pricing Tiers */}
      <section className={styles.tierSection}>
        <h2 className={styles.tierSectionTitle}>Choose a Package</h2>
        <div className={styles.tierGrid}>
          {service.tiers.map((tier) => {
            const isSelected = selectedTier?.id === tier.id;
            return (
              <div
                key={tier.id}
                className={`${styles.tierCard} ${isSelected ? styles.tierCardSelected : ''}`}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => setSelectedTier(tier)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedTier(tier);
                  }
                }}
              >
                {isSelected && <span className={styles.selectedBadge}>Selected</span>}
                <div className={styles.tierHeader}>
                  <h3 className={styles.tierName}>{tier.name}</h3>
                  <span className={styles.tierPrice}>${tier.price}</span>
                </div>
                <p className={styles.tierDescription}>{tier.description}</p>
                <ul className={styles.tierIncludes}>
                  {tier.includes.map((item) => (
                    <li key={item} className={styles.tierIncludeItem}>
                      <FaCheck className={styles.checkIcon} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleBookNow}
          disabled={!selectedTier}
        >
          Book Now{selectedTier ? ` — $${selectedTier.price}` : ''}
        </Button>
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={handleAddToCart}
          disabled={!selectedTier}
        >
          <FaShoppingCart style={{ marginRight: '0.5rem' }} aria-hidden="true" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ServiceDetail;
