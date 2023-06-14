import React, { useState } from 'react'

export default function Order({ book }) {
    const price = book.price;
    const stock = book.stock;
    const id = book.id;

    //I set TVA to 20%, because why not
    const tauxTVA = "0.2";

    //all this we get from the form
    const [quantity, setQuantity] = useState("");
    const [TVA, setTVA] = useState("");
    const [HT, setHT] = useState("");
    const [TTC, setTTC] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        //here we need to do the post request when the back is ready to post our order,
        //in the meanwhile there is just an alert

        alert(`Submitting:
        ID: ${id}
        Price: ${price}
        Stock: ${stock}
        TVA Rate: ${tauxTVA}
        Quantity: ${quantity}
        TVA: ${TVA}
        HT: ${HT}
        TTC: ${TTC}`);
    }

    return (
        <div className="container">
            <div className="mt-4">
                <p>Prix (unité) : {price}</p>
                <p>Stock : {stock}</p>
                <p>Taux de TVA : {tauxTVA}</p>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Quantité"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="TVA"
                    value={TVA}
                    onChange={(e) => setTVA(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="HT"
                    value={HT}
                    onChange={(e) => setHT(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="TTC"
                    value={TTC}
                    onChange={(e) => setTTC(e.target.value)}
                />
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Valider"
                    onClick={handleSubmit}
                />
            </div>
        </div>
    )
}
