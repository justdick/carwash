import { useNavigate } from 'react-router';
import { FaArrowLeft, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../hooks/useCart';
import { Button } from '../../components/Button/Button';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import styles from './Cart.module.css';

export function Cart() {
  const navigate = useNavigate();
  const { items, itemCount, totalPrice, removeItem } = useCart();

  const handleBookAll = () => {
    navigate('/app/book', { state: { services: items } });
  };

  const handleBrowseServices = () => {
    navigate('/app/home');
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <button
            className={styles.backButton}
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <FaArrowLeft />
          </button>
          <h1 className={styles.pageTitle}>My Cart</h1>
        </header>
        <EmptyState
          icon={<FaShoppingCart />}
          title="Your cart is empty"
          message="Browse our services and add items to your cart to book them together."
          actionLabel="Browse Services"
          onAction={handleBrowseServices}
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <button
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <h1 className={styles.pageTitle}>
          My Cart
          <span className={styles.itemCount}>
            ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
        </h1>
      </header>

      {/* Cart Items */}
      <div className={styles.cartList} role="list">
        {items.map((item) => (
          <div key={item.id} className={styles.cartItem} role="listitem">
            <div className={styles.cartItemInfo}>
              <p className={styles.cartItemName}>{item.serviceName}</p>
              <p className={styles.cartItemTier}>{item.tierName}</p>
            </div>
            <div className={styles.cartItemRight}>
              <span className={styles.cartItemPrice}>${item.price}</span>
              <button
                className={styles.removeButton}
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.serviceName} from cart`}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <p className={styles.summaryLabel}>
            {itemCount} {itemCount === 1 ? 'service' : 'services'}
          </p>
          <p className={styles.summaryValue}>${totalPrice}</p>
        </div>
        <hr className={styles.summaryDivider} />
        <div className={styles.summaryTotal}>
          <p className={styles.summaryTotalLabel}>Total</p>
          <p className={styles.summaryTotalPrice}>${totalPrice}</p>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={handleBrowseServices}
        >
          Continue Shopping
        </Button>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleBookAll}
        >
          Book All — ${totalPrice}
        </Button>
      </div>
    </div>
  );
}

export default Cart;
