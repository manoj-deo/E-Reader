import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const styles = {
    footer: {
      backgroundColor: "#6d4c41",
      color: "#fff",
      padding: "1rem 0",
      textAlign: "center",
    },
    text: {
      fontSize: "0.9rem",
    },
  };

  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© {currentYear} E-Reader. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
