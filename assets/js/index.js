// Obtener referencias a los elementos del DOM
const titleElement = document.getElementById("Tabla");
const animalesElement = document.getElementById("Animales");
const animalSelect = document.getElementById("animal");
const edadSelect = document.getElementById("edad");
const comentarios = document.getElementById("comentarios");
const previewImage = document.getElementById("preview");
const btnRegistrar = document.getElementById("btnRegistrar");
const player = document.getElementById("player");
const exampleModal = document.getElementById("exampleModal");

// Variable para almacenar los datos de los animales
let data;

// Cargar datos de animales desde el archivo JSON
fetch('assets/js/animales.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
    // Agregar cada animal al select de animal
    data.animales.forEach(animal => {
      const option = document.createElement('option');
      option.value = animal.name;
      option.textContent = animal.name;
      animalSelect.appendChild(option);
    });
  })
  .catch(error => console.error('Error al cargar el archivo JSON', error));

// Función para obtener la ruta de la imagen
const obtenerRutaImagen = (nombreImagen) => {
  const rutaImagen = `./assets/imgs/${nombreImagen}`;
  console.log("Ruta de la imagen:", rutaImagen);
  return rutaImagen;
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
  const selectedAnimal = event.target.value;
  const selectedAnimalData = data.animales.find(animal => animal.name === selectedAnimal);
  const selectedAnimalImagePath = obtenerRutaImagen(selectedAnimalData.imagen);
  previewImage.innerHTML = ''; // Limpiar el contenido previo
  const selectedAnimalPreview = document.createElement('img');
  selectedAnimalPreview.src = selectedAnimalImagePath;
  selectedAnimalPreview.alt = `Imagen de ${selectedAnimal}`;
  previewImage.appendChild(selectedAnimalPreview);
});

// Agregar evento de clic al botón de registrar animal
btnRegistrar.addEventListener('click', () => {
  const selectedAnimal = animalSelect.value;
  const selectedEdad = edadSelect.value;
  const comentariosText = comentarios.value;

  // Validación para evitar campos vacíos
  if (!selectedAnimal || !selectedEdad || !comentariosText) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  const nuevoAnimal = {
    name: selectedAnimal,
    imagen: selectedAnimal + '.png', // No es necesario agregar la ruta completa aquí
    sonido: data.animales.find(a => a.name === selectedAnimal).sonido, // Get the correct audio file name from the JSON data
    edad: selectedEdad,
    comentarios: comentariosText
  };
  

  // Crear nueva card para el nuevo animal
  const nuevoAnimalCard = document.createElement('div');
  nuevoAnimalCard.classList.add('col-12', 'col-sm-4', 'my-2');

  const nuevoAnimalImage = document.createElement('img');
  nuevoAnimalImage.src = obtenerRutaImagen(nuevoAnimal.imagen);
  nuevoAnimalImage.alt = `Imagen de ${nuevoAnimal.name}`;
  nuevoAnimalImage.classList.add('card-img-top');

  const nuevoAnimalBody = document.createElement('div');
  nuevoAnimalBody.classList.add('card-body');

  const nuevoAnimalTitle = document.createElement('h5');
  nuevoAnimalTitle.classList.add('card-title');
  nuevoAnimalTitle.textContent = nuevoAnimal.name;
  nuevoAnimalTitle.style.color = 'white';

  const nuevoAnimalEdad = document.createElement('p');
  nuevoAnimalEdad.classList.add('card-text');
  nuevoAnimalEdad.textContent = `Edad: ${nuevoAnimal.edad}`;
  nuevoAnimalEdad.style.color = 'white';

  const nuevoAnimalComentarios = document.createElement('p');
  nuevoAnimalComentarios.classList.add('card-text');
  nuevoAnimalComentarios.textContent = nuevoAnimal.comentarios;
  nuevoAnimalComentarios.style.color = 'white';

  // Obtener referencia al elemento <audio> existente en el HTML
  const audioElement = document.getElementById("player");

  // Crear nuevo audio para el sonido del nuevo animal
  const nuevoAnimalAudio = document.createElement('audio');
  nuevoAnimalAudio.src = obtenerRutaSonido(nuevoAnimal.sonido);

  // Añadir el nuevo audio al elemento <audio> existente en el HTML
  audioElement.innerHTML = ''; // Limpiar el contenido previo del elemento <audio>
  audioElement.appendChild(nuevoAnimalAudio);

  // Crear botón para reproducir el sonido del nuevo animal
  const reproducirSonidoButton = document.createElement('button');
  reproducirSonidoButton.textContent = 'Reproducir sonido';
  reproducirSonidoButton.addEventListener('click', () => {
    nuevoAnimalAudio.play();
  });

  // Añadir elementos creados al cuerpo de la card
  nuevoAnimalBody.appendChild(nuevoAnimalTitle);
  nuevoAnimalBody.appendChild(nuevoAnimalEdad);
  nuevoAnimalBody.appendChild(nuevoAnimalComentarios);
  nuevoAnimalBody.appendChild(reproducirSonidoButton);

  // Añadir la imagen y el cuerpo a la card
  nuevoAnimalCard.appendChild(nuevoAnimalImage);
  nuevoAnimalCard.appendChild(nuevoAnimalBody);

  // Añadir la card al contenedor principal
  animalesElement.appendChild(nuevoAnimalCard);

  // Limpiar campos del formulario
  animalSelect.value = '';
  edadSelect.value = '';
  comentarios.value = '';
});
