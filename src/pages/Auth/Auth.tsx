import { useState, useCallback, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { HiOutlineSparkles, HiOutlineExclamationCircle } from 'react-icons/hi2';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePassword, validateRequired } from '../../utils/validation';
import styles from './Auth.module.css';

type Tab = 'login' | 'signup';

/**
 * Auth — Login and Signup page with tabbed forms.
 *
 * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6
 */
export function Auth() {
  const [activeTab, setActiveTab] = useState<Tab>('login');
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [loginFormError, setLoginFormError] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});
  const [signupFormError, setSignupFormError] = useState('');

  const switchTab = useCallback((tab: Tab) => {
    setActiveTab(tab);
    // Clear errors when switching tabs
    setLoginErrors({});
    setLoginFormError('');
    setSignupErrors({});
    setSignupFormError('');
  }, []);

  const handleLogin = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setLoginFormError('');

      // Validate fields
      const errors: Record<string, string> = {};
      const emailResult = validateEmail(loginEmail);
      if (!emailResult.valid) errors.email = emailResult.error!;
      const passwordResult = validatePassword(loginPassword);
      if (!passwordResult.valid) errors.password = passwordResult.error!;

      setLoginErrors(errors);
      if (Object.keys(errors).length > 0) return;

      // Attempt login
      const result = login(loginEmail, loginPassword);
      if (result.success) {
        navigate('/app/home');
      } else {
        setLoginFormError(result.error ?? 'Invalid email or password');
      }
    },
    [loginEmail, loginPassword, login, navigate],
  );

  const handleSignup = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setSignupFormError('');

      // Validate fields
      const errors: Record<string, string> = {};
      const nameResult = validateRequired(signupName, 'Name');
      if (!nameResult.valid) errors.name = nameResult.error!;
      const emailResult = validateEmail(signupEmail);
      if (!emailResult.valid) errors.email = emailResult.error!;
      const passwordResult = validatePassword(signupPassword);
      if (!passwordResult.valid) errors.password = passwordResult.error!;

      setSignupErrors(errors);
      if (Object.keys(errors).length > 0) return;

      // Attempt signup
      const result = signup(signupEmail, signupPassword, signupName);
      if (result.success) {
        navigate('/app/home');
      } else {
        setSignupFormError(result.error ?? 'Could not create account');
      }
    },
    [signupName, signupEmail, signupPassword, signup, navigate],
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo} aria-hidden="true">
          <HiOutlineSparkles />
        </div>
        <h1 className={styles.title}>CleanPro</h1>
        <p className={styles.subtitle}>Premium cleaning at your doorstep</p>
      </header>

      {/* Card with tabs */}
      <div className={styles.card}>
        {/* Tabs */}
        <div className={styles.tabs} role="tablist" aria-label="Authentication">
          <button
            className={`${styles.tab} ${activeTab === 'login' ? styles.tabActive : ''}`}
            role="tab"
            aria-selected={activeTab === 'login'}
            aria-controls="login-panel"
            id="login-tab"
            onClick={() => switchTab('login')}
          >
            Log In
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'signup' ? styles.tabActive : ''}`}
            role="tab"
            aria-selected={activeTab === 'signup'}
            aria-controls="signup-panel"
            id="signup-tab"
            onClick={() => switchTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {activeTab === 'login' && (
          <form
            id="login-panel"
            role="tabpanel"
            aria-labelledby="login-tab"
            className={styles.form}
            onSubmit={handleLogin}
            noValidate
          >
            {loginFormError && (
              <div className={styles.formError} role="alert">
                <HiOutlineExclamationCircle className={styles.formErrorIcon} />
                {loginFormError}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              value={loginEmail}
              onChange={setLoginEmail}
              error={loginErrors.email}
              placeholder="you@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              value={loginPassword}
              onChange={setLoginPassword}
              error={loginErrors.password}
              placeholder="Enter your password"
              required
            />

            <div className={styles.submitArea}>
              <Button type="submit" variant="primary" size="lg" fullWidth>
                Log In
              </Button>
            </div>
          </form>
        )}

        {/* Signup Form */}
        {activeTab === 'signup' && (
          <form
            id="signup-panel"
            role="tabpanel"
            aria-labelledby="signup-tab"
            className={styles.form}
            onSubmit={handleSignup}
            noValidate
          >
            {signupFormError && (
              <div className={styles.formError} role="alert">
                <HiOutlineExclamationCircle className={styles.formErrorIcon} />
                {signupFormError}
              </div>
            )}

            <Input
              label="Full Name"
              type="text"
              value={signupName}
              onChange={setSignupName}
              error={signupErrors.name}
              placeholder="Jane Doe"
              required
            />

            <Input
              label="Email"
              type="email"
              value={signupEmail}
              onChange={setSignupEmail}
              error={signupErrors.email}
              placeholder="you@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              value={signupPassword}
              onChange={setSignupPassword}
              error={signupErrors.password}
              placeholder="At least 6 characters"
              required
            />

            <div className={styles.submitArea}>
              <Button type="submit" variant="primary" size="lg" fullWidth>
                Create Account
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Auth;
