import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex space-x-4 py-2 sm:justify-center">
      {[
        ["Home", "/"],
        ["About", "/about"],
        ["Users List", "/users"],
        ["Users API", "/api/users"],
      ].map(([title, url]) => (
        <Link href={url} key={title}>
          <a className="rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            {title}
          </a>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
