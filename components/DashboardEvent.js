import Link from "next/link";
import styles from "@/styles/DashboardEvent.module.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

export default function DashboardEvent({
  evt: { attributes, id },
  handleDelete,
}) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${id}`}>
          <a>{attributes.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${id}`}>
        <a className={styles.edit}>
          <FaPencilAlt /> <span>Edit Event</span>
        </a>
      </Link>

      <a className={styles.delete} onClick={() => handleDelete(id)}>
        <FaTimes /> <span>Delete</span>
      </a>
    </div>
  );
}
