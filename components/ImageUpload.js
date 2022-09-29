import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

export default function ImageUpload({ evtId, imageUploaded, token }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const form = document.querySelector("form");

    // form.addEventListener("submit", async (e) => {
    //   e.preventDefault();

    //   await fetch(`${API_URL}/api/upload`, {
    //     method: "post",
    //     body: new FormData(e.target),
    //   });
    // });
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "api::event.event");
    formData.append("refId", evtId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      console.log("hola");
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        {/* <input type="file" name="files" />
        <input type="text" name="ref" value="api::events" />
        <input type="text" name="refId" value={evtId} />
        <input type="text" name="field" value="image" /> */}
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}
