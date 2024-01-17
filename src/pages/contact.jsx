import React, { useState } from "react";
import "../styles/contact.scss";

function ContactPage() {
  return (
    <>
      <div className="contact">
        <h1>Contact</h1>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.4943334572135!2d2.3332981999999998!3d48.8678522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f0c31ec0787%3A0xec70be4fbd091765!2zQ8OpZHJpYyBHcm9sZXQgT3DDqXJh!5e0!3m2!1sfr!2sfr!4v1705403947015!5m2!1sfr!2sfr"
            width="800"
            height="450"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <address>Cédric Grolet Opéra 35 Av. de l'Opéra, 75002 Paris</address>
      </div>
    </>
  );
}

export default ContactPage;