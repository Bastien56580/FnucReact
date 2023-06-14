import React, { useState } from 'react'

export default function Order({ book }) {
    const price = book.price;
    const stock = book.stock;

    //I set TVA to 20%, because why not
    const [tauxTVA, setTauxTVA] = useState("0.2");

    //all this we get from the form
    const [quantity, setQuantity] = useState("");
    const [TVA, setTVA] = useState("");
    const [HT, setHT] = useState("");
    const [TTC, setTTC] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        //here we need to do the post request
        alert(`submitting ${price} ${stock} ${tauxTVA} ${quantity} ${TVA} ${HT} ${TTC}`)
    }

    return (
        <div>
            <p>Prix (unité) : {price}</p>
            <p>stock : {stock}</p>
            <p>Taux de TVA : {tauxTVA}</p>
            {/* ... */}
            <input type="text" placeholder="Quantité" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <input type="text" placeholder="TVA" value={TVA} onChange={(e) => setTVA(e.target.value)} />
            <input type="text" placeholder="HT" value={HT} onChange={(e) => setHT(e.target.value)} />
            <input type="text" placeholder="TTC" value={TTC} onChange={(e) => setTTC(e.target.value)} />
            <input type="submit" value="Valider" onClick={handleSubmit} />
        </div>
    )
}
