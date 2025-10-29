export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-12">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-700 dark:text-gray-300">
          &copy; {new Date().getFullYear()} Blueberry Quest. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};
