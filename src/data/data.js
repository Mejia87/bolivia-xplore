const data = [
    {
        id: "1",
        type: "celebracion folclorica",
        name: "Festividad de la Virgen de Urkupiña ",
        direction:
            "Quillacollo, 14 km de CBBA",
        longitud: -17.2529,
        latitud: -68.25566,
        description: 'La Virgen de Urkupiña, Virgen de Urcupiña o Virgen de Urqupiña es una advocación de la Virgen María con el Niño Jesús en brazos, que se venera el 15 de agosto en la ciudad de Quillacollo, capital provincial a 14 km de la ciudad de Cochabamba en Bolivia. Comparte fiesta con el día de la "Asunción de María", cuando María siendo ya anciana es llevada al cielo. Por estos motivos la Virgen de Urkupiña es mal llamada Asunta.',
        history: 'Según la tradición popular, a fines del siglo XVII, hacia el sudoeste de Quillacollo, vivía una familia de campesinos que subsistían gracias a la utilidad de su pequeño rebaño de ovejas que se encontraba al cuidado de la hija menor. La muchacha se dirigía a diario hacia las bajas colinas del frente de Cota, pasaba el río de Sapinku, donde había pasto en abundancia para su rebaño. Un día de agosto, se le habría aparecido una señora con un niño en brazos, con la que sostenía largas conversaciones en el idioma del lugar, el quechua. La pastorcita jugaba con aquel niño en las aguas de una vertiente que brotaba de las rocas.',
        fechaIni: "",
        fechaFin: "",
        images: [
            { source: require("../../assets/virgen_urkupiña.jpg") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
        ],
    },
    {
        id: "2",
        type: "celebracion folclorica",
        name: "Carnaval de la Concordia",
        direction:
            "150 km, Sucre",
        longitud: -17.2529,
        latitud: -68.25566,
        description: "",
        history: "",
        fechaIni: "",
        fechaFin: "",
        images: [
            { source: require("../../assets/Carnaval.png") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
        ],
    },
    {
        id: "3",
        type: "celebracion folclorica",
        name: "Virgen de Amparo",
        direction:
            "Sacaba, 8 km de CBBA",
        longitud: -17.2529,
        latitud: -68.25566,
        description: "",
        history: "",
        fechaIni: "",
        fechaFin: "",
        images: [
            { source: require("../../assets/virgen de amparo.png") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
        ],
    },
    {
        id: "4",
        type: "celebracion folclorica",
        name: "Virgen de la Bella",
        direction:
            "Arani, 15 km  de CBBA",
        longitud: -17.2529,
        latitud: -68.25566,
        description: "",
        history: "",
        fechaIni: "",
        fechaFin: "",
        images: [
            { source: require("../../assets/virgen de la bella.png") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
        ],
    },
    {
        id: "5",
        type: "celebracion folclorica",
        name: "Santa Vera Cruz",
        direction:
            "Valle Hermoso, 6 km de CBBA",
        longitud: -17.2529,
        latitud: -68.25566,
        description: "",
        history: "",
        fechaIni: "",
        fechaFin: "",
        images: [
            { source: require("../../assets/santa vera cruz.png") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
        ],
    },
    {
        id: "6",
        type: "celebracion folclorica",
        name: "San Joaquin",
        direction:
            "Quillacollo, capital provincial a 14 km de la ciudad de Cochabamba",
        longitud: -17.2529,
        latitud: -68.25566,
        description: "",
        history: "",
        fechaIni: "",
        fechaFin: "",
        images: [
            { source: require("../../assets/san joaquin.png") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
        ],
    },
    {
        id: "7",
        type: "celebracion folclorica",
        name: "Festividad Santa Ana",
        direction:
            "Quillacollo, capital provincial a 14 km de la ciudad de Cochabamba",
        longitud: -17.2529,
        latitud: -68.25566,
        description: "",
        history: "",
        fechaIni: "",
        fechaFin: "",
        images: [
            { source: require("../../assets/ana.png") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
        ],
    },
    {
        id: "8",
        type: "celebracion folclorica",
        name: "San Antonio",
        direction:
            "Quillacollo, capital provincial a 14 km de la ciudad de Cochabamba",
        longitud: -17.2529,
        latitud: -68.25566,
        description: "",
        history: "",
        fechaIni: "",
        fechaFin: "",
        images: [
            { source:  require("../../assets/san antonio.png") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
        ],
    },
    {
        id: "9",
        type: "celebracion folclorica",
        name: "Virgen del Carmen",
        direction:
            "Quillacollo, capital provincial a 14 km de la ciudad de Cochabamba",
        longitud: -17.2529,
        latitud: -68.25566,
        description: "",
        history: "",
        fechaIni: "",
        fechaFin: "",
        images: [
            { source:  require("../../assets/virgen del carmen.png") },
            { source: require("../../assets/celebracionFolklorica.jpg") },
            { source: require("../../assets/virgen del carmen.png") },
        ],
    },
    
];

// const addEvent = (params) => {
//      data.push({
//          id: parseInt(data[data.length - 1].id) + 1,
//          title: params.categoria,
//         subtitle: params.subtitle,
//          imageSource: params.image,
//     });
//  };

export default data
