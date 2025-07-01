import styles from './Modal.module.css';

export default function Modal({ title, onClose, onConfirm }) {
    return (
        <>
            <div className={styles.backdrop} onClick={onClose} />
            <div className={styles.modal}>
                <h3>{title}</h3>
                <div className={styles.actions}>
                    <button className={styles.confirmBtn} onClick={onConfirm}>
                        Yes
                    </button>
                    <button className={styles.cancelBtn} onClick={onClose}>
                        No
                    </button>
                </div>
            </div>
        </>
    );
}