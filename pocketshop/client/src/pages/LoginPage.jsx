import React from "react";
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";

export default function LoginPage() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login({
        username,
        password,
      });

      navigate("/wallet");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <aside className="auth-panel auth-panel-left">
        <div className="auth-card">
          <div className="brand-block" aria-label="MongoDB brand">
            <span className="brand-mark">
              <span className="brand-mark-inner" />
            </span>
            <span className="brand-name">MongoDB.</span>
          </div>

          <div className="auth-header">
            <h1>Log in to your account</h1>
            <p>
              Don&apos;t have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>

          <div className="social-auth">
            <button type="button" className="social-button">
              <span className="social-icon google-icon">G</span>
              Google
            </button>
            <button type="button" className="social-button">
              <span className="social-icon github-icon">◉</span>
              GitHub
            </button>
          </div>

          <div className="auth-divider">
            <span>Or with email and password</span>
          </div>

          <Alert message={error} className="auth-alert" />

          <form className="auth-form" onSubmit={submit}>
            <Input
              label="Email Address"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your@email.com"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <div className="auth-forgot">
              <Link to="/register">Forgot Password?</Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              loading={loading}
              className="auth-submit"
            >
              Login
            </Button>
          </form>
        </div>
      </aside>

      <section className="auth-panel auth-panel-right" aria-label="MongoDB product promotion">
        <div className="hero-copy">
          <h2>
            Build faster and scale
            <br />
            further with MongoDB
            <br />
            9.0
          </h2>

          <p>
            Experience up to 2x throughput,
            <br />
            enhanced scalability, and unmatched
            <br />
            resilience.
          </p>

          <a href="/" className="hero-link">
            Explore 9.0 <span>→</span>
          </a>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <span className="shape shape-one" />
          <span className="shape shape-two" />
          <span className="shape shape-three" />
          <span className="shape shape-four" />
          <span className="shape shape-five" />
          <span className="shape shape-six" />
          <span className="shape shape-seven" />
          <span className="shape shape-eight" />
          <span className="shape shape-nine" />
        </div>
      </section>
    </div>
  );
}
