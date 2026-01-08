const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

const BANNED_WORDS = [
    "tonto", "idiota", "estúpido", "basura", "imbécil", "estupido"
];

function censorText(text) {
    if (!text) return text;
    let censoredText = text;
    BANNED_WORDS.forEach(word => {
        const regex = new RegExp(word, "gi");
        censoredText = censoredText.replace(regex, "*".repeat(word.length));
    });
    return censoredText;
}

exports.getKudosStats = onRequest(async (req, res) => {
    try {
        const db = getFirestore();
        const kudosRef = db.collection("KUDOS");
        const snapshot = await kudosRef.get();

        const categoryCounts = {};

        snapshot.forEach(doc => {
            const data = doc.data();
            let categoryName = "Sin categoría";

            if (typeof data.category === 'string') {
                categoryName = data.category;
            } else if (data.category && data.category.name) {
                categoryName = data.category.name;
            }

            if (categoryCounts[categoryName]) {
                categoryCounts[categoryName]++;
            } else {
                categoryCounts[categoryName] = 1;
            }
        });

        res.json(categoryCounts);
    } catch (error) {
        console.error("error al obtener estadísticas:", error);
        res.status(500).send("error al obtener estadísticas");
    }
});

exports.addKudoViaFunction = onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
        return;
    }

    try {
        const { sender, recipient, message, category } = req.body;

        if (!sender || !recipient || !message) {
            return res.status(400).send("Faltan campos obligatorios");
        }

        const db = getFirestore();
        const censoredMessage = censorText(message);
        const newKudo = {
            sender: { displayName: sender },
            recipient: { displayName: recipient },
            message: censoredMessage,
            category,
            isHidden: false,
            createdAt: new Date(),
            source: "Cloud Function"
        };

        const docRef = await db.collection("KUDOS").add(newKudo);
        res.status(201).json({ id: docRef.id, message: "Kudo creado vía Cloud Function" });
    } catch (error) {
        console.error("Error al añadir kudo:", error);
        res.status(500).send("Error interno al añadir kudo");
    }
});

exports.onKudoCreated = onDocumentCreated("KUDOS/{docId}", async (event) => {
    const data = event.data.data();
    if (!data || !data.message) return;

    const censoredMessage = censorText(data.message);
    if (censoredMessage !== data.message) {
        return event.data.ref.update({ message: censoredMessage });
    }
});
