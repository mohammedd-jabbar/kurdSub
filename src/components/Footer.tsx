const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p className="text-sm">
        © 2024 Your Project Name. View on{" "}
        <a
          href="https://github.com/your-username/your-project-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
