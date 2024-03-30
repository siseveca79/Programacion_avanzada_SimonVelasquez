// Obtener referencias a los elementos del DOM
const titleElement = document.getElementById("Tabla"); // Referencia al título de la tabla
const animalesElement = document.getElementById("Animales"); // Referencia al contenedor de las tarjetas de animales
const animalSelect = document.getElementById("animal"); // Referencia al select de animales
const edadSelect = document.getElementById("edad"); // Referencia al select de edades
const comentarios = document.getElementById("comentarios"); // Referencia al textarea de comentarios
const previewImage = document.getElementById("preview"); // Referencia al contenedor de la imagen previa
const btnRegistrar = document.getElementById("btnRegistrar"); // Referencia al botón de registrar animal
const player = document.getElementById("player"); // Referencia al elemento de audio
const exampleModal = document.getElementById("exampleModal"); // Referencia al modal de ejemplo

// Variable para almacenar los datos de los animales
let data;

// Cargar datos de animales desde el archivo JSON
fetch('assets/js/animales.json') // Cargar datos desde el archivo JSON
  .then(response => response.json()) // Convertir la respuesta a JSON
  .then(jsonData => {
    data = jsonData; // Almacenar los datos en la variable data
    // Agregar cada animal al select de animal
    data.animales.forEach(animal => { // Iterar sobre cada animal en el arreglo
      const option = document.createElement('option'); // Crear una nueva opción para el select
      option.value = animal.name; // Establecer el valor de la opción como el nombre del animal
      option.textContent = animal.name; // Establecer el texto de la opción como el nombre del animal
      animalSelect.appendChild(option); // Agregar la opción al select de animales
    });
  })
  .catch(error => console.error('Error al cargar el archivo JSON', error)); // Manejar errores al cargar el archivo JSON

// Función para obtener la ruta de la imagen
const obtenerRutaImagen = (nombreImagen) => {
  const rutaImagen = `./assets/imgs/${nombreImagen}`; // Construir la ruta de la imagen concatenando el nombre de la imagen con la ruta base
  console.log("Ruta de la imagen:", rutaImagen); // Imprimir la ruta de la imagen en la consola
  return rutaImagen; // Devolver la ruta de la imagen
};

// Función para obtener la ruta del sonido
const obtenerRutaSonido = (nombreAnimal) => {
  const animal = data.animales.find(a => a.name === nombreAnimal);
  if (animal) {
    const rutaSonido = `./assets/sounds/${animal.sonido}`;
    console.log("Ruta del sonido:", rutaSonido);
    return rutaSonido;
  } else {
    console.log("Animal no encontrado");
    return '';
  }
};

// Agregar evento de cambio al select de animal para mostrar la imagen previa
animalSelect.addEventListener('change', (event) => {
  const selectedAnimal = event.target.value; // Obtener el valor seleccionado en el select de animales
  const selectedAnimalData = data.animales.find(animal => animal.name === selectedAnimal); // Buscar el animal en el arreglo de animales por su nombre
  const selectedAnimalImagePath = obtenerRutaImagen(selectedAnimalData.imagen); // Obtener la ruta de la imagen del animal seleccionado
  previewImage.innerHTML = ''; // Limpiar el contenido previo del contenedor de la imagen previa
  const selectedAnimalPreview = document.createElement('img'); // Crear una nueva imagen para mostrar la imagen previa
  selectedAnimalPreview.src = selectedAnimalImagePath; // Establecer la ruta de la imagen de la imagen previa
  selectedAnimalPreview.alt = `Imagen de ${selectedAnimal}`;
  selectedAnimalPreview.style.width = '200px'; // Establecer el ancho de la imagen previa
  selectedAnimalPreview.style.height = '200px'; // Establecer la altura de la imagen previa
  previewImage.appendChild(selectedAnimalPreview); // Agregar la imagen previa al contenedor de la imagen previa
});

// Agregar evento de clic al botón de registrar animal
btnRegistrar.addEventListener('click', () => {
  const selectedAnimal = animalSelect.value; // Obtener el valor seleccionado en el select de animales
  const selectedEdad = edadSelect.value; // Obtener el valor seleccionado en el select de edades
  const comentariosText = comentarios.value; // Obtener el texto ingresado en el textarea de comentarios

  // Validación para evitar campos vacíos
  if (!selectedAnimal || !selectedEdad || !comentariosText) {
    alert('Por favor, completa todos los campos.'); // Mostrar un mensaje de error si alguno de los campos está vacío
    return; // Detener la ejecución de la función si alguno de los campos está vacío
  }

  // Crear un objeto para el nuevo animal con los datos ingresados
  const nuevoAnimal = {
    name: selectedAnimal, // Establecer el nombre del nuevo animal
    imagen: selectedAnimal + '.png', // Establecer la ruta de la imagen del nuevo animal
    sonido: obtenerRutaSonido(selectedAnimal), // Obtener la ruta del sonido del nuevo animal a partir del nombre del animal
    edad: selectedEdad, // Establecer la edad del nuevo animal
    comentarios: comentariosText // Establecer los comentarios del nuevo animal
  };

  // Crear elementos HTML para mostrar el nuevo animal en una tarjeta
  const nuevoAnimalCard = document.createElement('div'); // Crear una nueva card para el nuevo animal
  nuevoAnimalCard.classList.add('col-12', 'col-sm-4', 'my-2', 'card'); // Establecer las clases de la card
  nuevoAnimalCard.style.padding = '5px'; // Agregar 10 píxeles de relleno a todos los lados de la tarjeta
  nuevoAnimalCard.style.margin = '5px'; // Agregar 10 píxeles de margen a todos los lados de la tarjeta

  const nuevoAnimalBody = document.createElement('div'); // Crear un nuevo cuerpo para la card del nuevo animal
  nuevoAnimalBody.classList.add('card-body'); // Establecer las clases del cuerpo de la card del nuevo animal
  nuevoAnimalBody.style.width = '100%'; // Establecer el ancho de la tarjeta
  nuevoAnimalBody.style.height = '200px';
  nuevoAnimalBody.style.objectFit = 'cover';
  nuevoAnimalBody.style.backgroundColor = 'white';

  const nuevoAnimalImage = document.createElement('img'); // Crear una nueva imagen para el nuevo animal
  nuevoAnimalImage.src = obtenerRutaImagen(nuevoAnimal.imagen); // Establecer la ruta de la imagen del nuevo animal
  nuevoAnimalImage.alt = `Imagen de ${nuevoAnimal.name}`; // Establecer el texto alternativo de la imagen del nuevo animal
  nuevoAnimalImage.classList.add('card-img-top'); // Establecer las clases de la imagen del nuevo animal
  nuevoAnimalImage.style.width = '100%'; // Establecer el ancho de la imagen al 100% del contenedor (tarjeta)
  nuevoAnimalImage.style.height = '200px'; // Establecer la altura fija de la imagen a 300px
  nuevoAnimalImage.style.objectFit = 'cover'; // Ajustar la imagen dentro de su contenedor manteniendo la relación de aspecto
  nuevoAnimalImage.style.backgroundColor = 'dark'; // Establecer el color de fondo de la imagen

  const nuevoAnimalTitle = document.createElement('h5'); // Crear un nuevo título para la card del nuevo animal
  nuevoAnimalTitle.classList.add('card-title'); // Establecer las clases del título de la card del nuevo animal
  nuevoAnimalTitle.textContent = nuevoAnimal.name; // Establecer el texto del título de la card del nuevo animal
  nuevoAnimalTitle.style.color = 'dark'; // Establecer el color del texto del título de la card del nuevo animal

  const nuevoAnimalEdad = document.createElement('p'); // Crear un nuevo párrafo para la edad del nuevo animal
  nuevoAnimalEdad.classList.add('card-text'); // Establecer las clases del párrafo de la edad del nuevo animal
  nuevoAnimalEdad.textContent = `Edad: ${nuevoAnimal.edad}`; // Establecer el texto del párrafo de la edad del nuevo animal
  nuevoAnimalEdad.style.color = 'dark'; // Establecer el color del texto del párrafo de la edad del nuevo animal

  const nuevoAnimalComentarios = document.createElement('p'); // Crear un nuevo párrafo para los comentarios del nuevo animal
  nuevoAnimalComentarios.classList.add('card-text'); // Establecer las clases del párrafo de los comentarios del nuevo animal
  nuevoAnimalComentarios.textContent = nuevoAnimal.comentarios; // Establecer el texto del párrafo de los comentarios del nuevo animal
  nuevoAnimalComentarios.style.color = 'dark'; // Establecer el color del texto del párrafo de los comentarios del nuevo animal





  // Crear botón para reproducir el sonido del nuevo animal
  const reproducirSonidoButton = document.createElement('button');
  reproducirSonidoButton.textContent = 'Reproducir sonido';
  reproducirSonidoButton.addEventListener('click', () => {
    const audioElement = document.createElement('audio');
    audioElement.src = obtenerRutaSonido(nuevoAnimal.name);
    audioElement.id = `audio-${nuevoAnimal.name}`;
    player.appendChild(audioElement);
    audioElement.play();
  });




  // Agregar evento de clic a la imagen del nuevo animal para mostrar el modal
  nuevoAnimalImage.addEventListener('click', () => {
    const animal = data.animales.find(a => a.name === nuevoAnimal.name);
    // Set modal content
    document.getElementById('modalAnimalName').textContent = nuevoAnimal.name;
    document.getElementById('modalAnimalImage').src = obtenerRutaImagen(nuevoAnimal.imagen);
    document.getElementById('modalAnimalEdad').textContent = `Edad: ${nuevoAnimal.edad}`;
    document.getElementById('modalAnimalComentarios').textContent = `Comentario: ${nuevoAnimal.comentarios}`;
    // Show modal
    $('#exampleModal').modal('show');

    // Cambia el fondo del modal-body y modal-header a blanco
    const modalBody = $('#exampleModal .modal-body');
    const modalHeader = $('#exampleModal .modal-header');
    modalBody.css('background-color', 'white');
    modalHeader.css('background-color', 'white');
  });

  // Añadir la imagen al cuerpo de la card
  nuevoAnimalBody.appendChild(nuevoAnimalImage);


  // Añadir elementos creados al cuerpo de la card
  nuevoAnimalBody.appendChild(nuevoAnimalTitle); // Agregar el título de la card del nuevo animal al cuerpo de la card
  nuevoAnimalBody.appendChild(nuevoAnimalEdad); // Agregar el párrafo de la edad del nuevo animal al cuerpo de la card
  nuevoAnimalBody.appendChild(nuevoAnimalComentarios); // Agregar el párrafo de los comentarios del nuevo animal al cuerpo de la card
  nuevoAnimalBody.appendChild(reproducirSonidoButton); // Agregar el botón para reproducir el sonido del nuevo animal al cuerpo de la card

  // Añadir la imagen y el cuerpo a la card
  nuevoAnimalCard.appendChild(nuevoAnimalImage); // Agregar la imagen del nuevo animal a la card
  nuevoAnimalCard.appendChild(nuevoAnimalBody); // Agregar el cuerpo de la card del nuevo animal a la card

  // Añadir la card al contenedor principal
  animalesElement.appendChild(nuevoAnimalCard); // Agregar la card del nuevo animal al contenedor principal

  // Limpiar campos del formulario
  animalSelect.value = ''; // Limpiar el valor seleccionado en el select de animales
  edadSelect.value = ''; // Limpiar el valor seleccionado en el select de edades
  comentarios.value = ''; // Limpiar el texto ingresado en el textarea de comentarios
});
