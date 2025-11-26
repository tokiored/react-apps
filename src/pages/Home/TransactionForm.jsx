import { useState } from 'react'

import { useFirestore } from 'hooks/useFirestore'
import { useAuthContext } from 'hooks/useAuthContext'

export default function TransactionForm({ uid }) {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const { addDocument, response } = useFirestore()
    const { user } = useAuthContext()

    function resetForm() {
        setName('')
        setAmount('')
    }

    async function handleSubmit(e) {
        e.preventDefault()

        await addDocument({
            uid: user.uid,
            name,
            amount,
        })
        resetForm()
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    Amount
                    <input
                        type="number"
                        name="amount"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
