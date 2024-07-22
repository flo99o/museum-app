import vidgall from "../../assets/vidgall.mp4";
import styles from "./hearder.module.css";

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <video className={styles.videoBackground} loop autoPlay muted>
        <source src={vidgall} type="video/mp4" />
      </video>
      <div className={styles.contentOverlay}>
        <h1>Art Institute</h1>
        <p>
          Plongez dans l'histoire des musées de France et découvrez notre
          localisation. Explorez notre site pour en savoir plus !
        </p>
      </div>
    </header>
  );
};
