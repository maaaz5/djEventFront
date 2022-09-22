import Layout from "@/components/Layout";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/config/index";

export default function EventPage({ evt: { attributes, id } }) {
  console.log(attributes);
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(attributes.date).toLocaleDateString("en-US")} at{" "}
          {attributes.time}
        </span>
        <h1>{attributes.name}</h1>

        {attributes.image && (
          <div className={styles.image}>
            <Image
              src={attributes.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{attributes.performers}</p>
        <h3>Description:</h3>
        <p>{attributes.description}</p>
        <h3>Venue: {attributes.venue}</h3>
        <p>{attributes.address}</p>

        {/* <EventMap evt={attributes} /> */}

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  const paths = events.data.map((ev) => ({
    params: { id: ev.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
  const events = await res.json();

  return {
    props: { evt: events.data },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();

//   return {
//     props: { evt: events[0] },
//   };
// }
