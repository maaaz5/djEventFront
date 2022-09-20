import Link from "next/link";
import Head from "next/head";
const AboutPage = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is an app to find the latest DJ and other musical events</p>
      <p>Version : 1.0.0</p>
      <ul>
        <li>
          <Link href={"/"}>Go Back</Link>
        </li>
      </ul>
    </div>
  );
};

export default AboutPage;
