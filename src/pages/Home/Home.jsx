import { useCollection } from 'hooks/useCollection'
import styles from './Home.module.css'
import TransactionForm from './TransactionForm'
import Transactions from './Transactions'
import { useAuthContext } from 'hooks/useAuthContext'

export default function Home() {
    const { user } = useAuthContext()
    const { documents, isPending, error } = useCollection(
        'transactions',
        ['uid', '==', user.uid],
        ['created_at', `desc`]
    )

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h3>Transactions</h3>
                {error && <p className="error">{error}</p>}
                {<Transactions documents={documents} />}
            </div>
            <div className={styles.sidebar}>
                <h3>Add a Transaction</h3>
                <TransactionForm />
            </div>
        </div>
    )
}
