import styles from './Home.module.css'

export default function Transactions({ documents }) {
    return (
        <>
            {!documents && <p>No documents found</p>}
            {documents && (
                <ul className={styles.transactions}>
                    {documents.map((doc) => (
                        <li key={doc.id}>
                            <p className={styles.name}>{doc.name}</p>
                            <p className={styles.amount}>${doc.amount}</p>
                            <button>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}
