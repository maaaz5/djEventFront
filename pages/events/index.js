import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No event to show</h3>}
      {events.map((evt) => (
        <EventItem evt={evt} key={evt.id} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  //start page calc
  const start = +page === 1 ? 0 : (page - 1) * PER_PAGE;
  const res = await fetch(
    `${API_URL}/api/events?populate=*&_sort=date:ASC&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`
  );
  const events = await res.json();

  return {
    props: {
      events: events.data,
      page: +page,
      total: events.meta.pagination.total,
    },
  };
}
