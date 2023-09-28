let books = [
  {id:1, titre:'Atomic habits', auteur:'James Clear', prix:30},
  {id:2, titre:'Power of habits', auteur:'Jeff Olsen', prix:25}
];

const showBooks = ()=>{
 //console.log("Afficher les livres");

 //Etape 1 : Récupérer l'emplacement ou on va charger les nouveaux éléments
  const tbody = document.querySelector('#tab1 tbody');

  //Etape 2 : Préparer le nouveau code HTML à injecter
  let newHTML = '';
  books.forEach(
    (book)=>{
      newHTML += '<tr>';
        newHTML += '<td>' + book.id + '</td>';
        newHTML += `<td><input type="text" class="form-control border-0 bg-transparent" disabled value='${book.titre}'></td>`;
        newHTML += `<td><input type="text" class="form-control border-0 bg-transparent" disabled value='${book.auteur}'></td>`;
        newHTML += `<td><input type="text" class="form-control border-0 bg-transparent" disabled value='${book.prix}'></td>`;
        newHTML += `<td><button class='btn btn-primary'>Editer</button></td>`;
        newHTML += `<td><button class='btn btn-danger'>Supprimer  </button></td>`;
      newHTML += '</tr>';
    }
  );

  //Etape 3 : Injecter le nouveau code HTML dans le TBody
  tbody.innerHTML = newHTML;

  
  supp=document.querySelectorAll("table button[class*='btn-danger']");
  for (let i = 0; i < supp.length; i++) {
    (function (index) {
      supp[index].addEventListener("click", () => {
        books = books.filter(book => book.id != books[index].id);
        showBooks();
      });
    })(i);
  }
  edit=document.querySelectorAll("table button[class*='btn-primary']");
  inputs=document.querySelectorAll("table td input");
  console.log(inputs)
  // Assuming you already have the `edit` and `inputs` selections

for (let i = 0; i < edit.length; i++) {
  (function (index) {
    let editing = false; // Variable to track the edit/confirm state

    edit[index].addEventListener("click", () => {
      if (!editing) {
        // Switch to edit mode
        edit[index].innerText = "Confirmer";
        inputs[index * 3].removeAttribute("disabled");
        inputs[index * 3 + 1].removeAttribute("disabled");
        inputs[index * 3 + 2].removeAttribute("disabled");
        inputs[index * 3].classList.remove('bg-transparent', 'border-0');
        inputs[index * 3 + 1].classList.remove('bg-transparent', 'border-0');
        inputs[index * 3 + 2].classList.remove('bg-transparent', 'border-0');
      } else {
        // Switch to confirm mode
        edit[index].innerText = "Editer";
        // Update the books array with new values from the inputs
        books[index].titre = inputs[index * 3].value;
        books[index].auteur = inputs[index * 3 + 1].value;
        books[index].prix = inputs[index * 3 + 2].value;
        // Disable the inputs
        inputs[index * 3].setAttribute("disabled", true);
        inputs[index * 3 + 1].setAttribute("disabled", true);
        inputs[index * 3 + 2].setAttribute("disabled", true);
        inputs[index * 3].classList.add('bg-transparent', 'border-0');
        inputs[index * 3 + 1].classList.add('bg-transparent', 'border-0');
        inputs[index * 3 + 2].classList.add('bg-transparent', 'border-0');
      }

      editing = !editing; // Toggle the edit/confirm state
    });
  })(i);
}


}

const showAddForm = ()=>{
  document.getElementById('formAjout').classList.remove('hide');
}

const addBook = (e)=>{
  //Annuler le comportement par défaut (actualisation de la page)
  e.preventDefault();

  //Création d'un nouvel objet Book à partir des valeurs saisies dans le formulaire
  const newBook = {
    id: books.length==0?1: books[books.length-1].id + 1,
    titre : document.getElementById('titre').value,
    auteur : document.getElementById('auteur').value,
    prix : document.getElementById('prix').value
  }

  //Ajout du nouveau Book dans le tableau books
  books.push(newBook);

  //Rafraichir l'affichage du tableau HTML
  showBooks();

}

const init = ()=>{
  showBooks();
  document.getElementById('btnAjout')
    .addEventListener('click', showAddForm);
  document.getElementById('addForm').addEventListener('submit', addBook);
}

window.addEventListener('load', init);
//showBooks : callback function ==> Programation asynchrone
