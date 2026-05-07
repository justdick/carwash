import { useParams, useNavigate } from 'react-router';
import { FaCar, FaHome, FaCouch, FaTools, FaRegWindowMaximize, FaArrowLeft } from 'react-icons/fa';
import { getCategoryById } from '../../data/categories';
import { getServicesByCategory } from '../../data/services';
import { Card } from '../../components/Card/Card';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import type { ReactNode } from 'react';
import styles from './CategoryListing.module.css';

/** Map icon string identifiers from data to actual react-icons components. */
const iconMap: Record<string, ReactNode> = {
  FaCar: <FaCar />,
  FaHome: <FaHome />,
  FaCouch: <FaCouch />,
  FaRegWindowMaximize: <FaRegWindowMaximize />,
  FaTools: <FaTools />,
};

export function CategoryListing() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const services = categoryId ? getServicesByCategory(categoryId) : [];

  if (!category) {
    return (
      <div className={styles.page}>
        <EmptyState
          icon={<FaTools />}
          title="Category not found"
          message="The category you're looking for doesn't exist."
          actionLabel="Go Home"
          onAction={() => navigate('/app/home')}
        />
      </div>
    );
  }

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
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>{category.name}</h1>
          <p className={styles.subtitle}>
            {services.length} {services.length === 1 ? 'service' : 'services'} available
          </p>
        </div>
      </header>

      {/* Service Cards */}
      {services.length === 0 ? (
        <EmptyState
          icon={iconMap[category.icon] ?? <FaTools />}
          title="No services yet"
          message="Services for this category are coming soon."
          actionLabel="Browse Other Categories"
          onAction={() => navigate('/app/home')}
        />
      ) : (
        <div className={styles.serviceList}>
          {services.map((service) => {
            const startingPrice = Math.min(...service.tiers.map((t) => t.price));
            return (
              <Card
                key={service.id}
                hoverable
                onClick={() => navigate(`/app/service/${service.id}`)}
                className={styles.serviceCard}
              >
                <div className={styles.serviceIcon} aria-hidden="true">
                  {iconMap[service.image] ?? null}
                </div>
                <div className={styles.serviceInfo}>
                  <h2 className={styles.serviceName}>{service.name}</h2>
                  <p className={styles.serviceDescription}>{service.shortDescription}</p>
                  <div className={styles.serviceMeta}>
                    <span className={styles.servicePrice}>From ${startingPrice}</span>
                    <span className={styles.serviceDuration}>{service.duration}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CategoryListing;
