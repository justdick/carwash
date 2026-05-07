import { useNavigate } from 'react-router';
import { FaCar, FaHome, FaCouch, FaTools } from 'react-icons/fa';
import { FaRegWindowMaximize } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { categories } from '../../data/categories';
import { getFeaturedServices } from '../../data/services';
import { promotions } from '../../data/promotions';
import { Card } from '../../components/Card/Card';
import { PromoBanner } from '../../components/PromoBanner/PromoBanner';
import type { ReactNode } from 'react';
import styles from './Home.module.css';

/** Map icon string identifiers from data to actual react-icons components. */
const iconMap: Record<string, ReactNode> = {
  FaCar: <FaCar />,
  FaHome: <FaHome />,
  FaCouch: <FaCouch />,
  FaRegWindowMaximize: <FaRegWindowMaximize />,
  FaTools: <FaTools />,
};

export function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const featured = getFeaturedServices();

  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className={styles.page}>
      {/* Greeting */}
      <header className={styles.greeting}>
        <p className={styles.greetingLabel}>Welcome back,</p>
        <h1 className={styles.greetingName}>{firstName} 👋</h1>
      </header>

      {/* Promo Banner */}
      <section aria-label="Promotions">
        <PromoBanner promotions={promotions} />
      </section>

      {/* Service Categories */}
      <section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Services</h2>
        </div>
        <div className={styles.categoryGrid}>
          {categories.map((cat) => (
            <Card
              key={cat.id}
              hoverable
              onClick={() => navigate(`/app/category/${cat.id}`)}
              className={styles.categoryCard}
            >
              <div className={styles.categoryIcon} aria-hidden="true">
                {iconMap[cat.icon] ?? null}
              </div>
              <p className={styles.categoryName}>{cat.name}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Services */}
      <section>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Services</h2>
        </div>
        <div className={styles.featuredGrid}>
          {featured.map((service) => {
            const startingPrice = Math.min(...service.tiers.map((t) => t.price));
            return (
              <Card
                key={service.id}
                hoverable
                onClick={() => navigate(`/app/service/${service.id}`)}
                className={styles.featuredCard}
              >
                <div className={styles.featuredIcon} aria-hidden="true">
                  {iconMap[service.image] ?? null}
                </div>
                <div className={styles.featuredInfo}>
                  <h3 className={styles.featuredName}>{service.name}</h3>
                  <p className={styles.featuredDescription}>{service.shortDescription}</p>
                  <div className={styles.featuredMeta}>
                    <span className={styles.featuredPrice}>From ${startingPrice}</span>
                    <span className={styles.featuredDuration}>{service.duration}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;
