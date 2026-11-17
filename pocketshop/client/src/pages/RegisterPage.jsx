import React from "react";
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";

export default function RegisterPage() {
  const { register } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    phone: "",
    password: "",
    pin: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await register(form);

      navigate("/wallet");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout auth-layout-register">
      <aside className="auth-panel auth-panel-left">
        <div className="auth-card">
          <div className="brand-block" aria-label="MongoDB brand">
            <span className="brand-mark">
              <span className="brand-mark-inner" />
            </span>
            <span className="brand-name">MongoDB.</span>
          </div>

          <div className="auth-header">
            <h1>Create your account</h1>
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>

          <Alert message={error} className="auth-alert" />

          <form className="auth-form" onSubmit={submit}>
            <Input
              label="Full name"
              name="fullName"
              value={form.fullName}
              onChange={change}
              placeholder="Moustapha Kallo"
            />

            <Input
              label="Username"
              name="username"
              value={form.username}
              onChange={change}
              placeholder="moustapha"
            />

            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={change}
              placeholder="08012345678"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={change}
              placeholder="Minimum 6 characters"
            />

            <Input
              label="PIN"
              name="pin"
              type="password"
              value={form.pin}
              onChange={change}
              placeholder="4 digits"
            />

            <Button type="submit" disabled={loading} loading={loading} className="auth-submit">
              {loading ? "Creating..." : "Create account"}
            </Button>
          </form>
        </div>
      </aside>

      <section className="auth-panel auth-panel-right auth-panel-right--compact" aria-label="MongoDB product promotion">
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
      </section>
    </div>
  );
}
