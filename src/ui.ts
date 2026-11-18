// Dag 4: Funktioner som bygger sidans innehåll med DOM. Gör alla tester gröna på tests.html.
// Röda understrykningar tills du skrivit return är normalt. ratt.bild och ratt.beskrivning är valfria (string | undefined): använd ?? "" för att få en text.
// Regel: använd createElement och textContent. Använd INTE innerHTML med data.
import { formateraPris } from "./pris";
import type { Ratt } from "./typer";

// 1. Bygger ett kort för en rätt och returnerar det (anropar inte append själv).
//    <article data-id="1">
//      <img src="..." alt="Illustration av kardemummabulle">
//      <h3>Kardemummabulle</h3>
//      <p>Beskrivning</p>
//      <p class="pris">35 kr</p>
//    </article>
export function skapaRattKort(ratt: Ratt): HTMLElement {
  // TODO
  const card = document.createElement("article");
  card.dataset.id = String(ratt.id);
  const image = document.createElement("img");
  image.src = ratt.bild ?? "";
  image.alt = `Illustration av ${ratt.namn.toLowerCase()}`;

  const heading = document.createElement("h3");
  heading.textContent = ratt.namn;

  const description = document.createElement("p");
  description.textContent = ratt.beskrivning ?? "";

  const price = document.createElement("p");
  price.classList.add("pris");
  price.textContent = formateraPris(ratt.pris);

  card.append(image, heading, description, price);

  return card;
}

// 2. Töm containern och lägg in ett kort per rätt.
//    Är listan tom: visa <p class="tom">Inga rätter hittades.</p> istället.
export function visaMeny(container: HTMLElement, ratter: Ratt[]): void {
  // TODO
   container.replaceChildren();
if (ratter.length === 0) {
  const message = document.createElement("p");
  message.classList.add("tom");
  message.textContent = "Inga rätter hittades.Prova ett annat filter.";
  container.append(message);
  return;
}
for (const dish of ratter) {
  const card = skapaRattKort(dish);
  container.append(card);
}
}
// 3. Sätt rubrikens text: "Meny (8 rätter)". Ett enda: "Meny (1 rätt)".
export function uppdateraRubrik(element: HTMLElement, antal: number): void {
  // TODO
  if (antal === 1) {
    element.textContent = "Meny (1 rätt)";
  } else {
    element.textContent = `Meny (${antal} rätter)`;
  }
}

// 4. Markera EN rätt som dagens rätt: klassen "dagens" ska finnas på kortet med rätt
//    data-id, och inte på något annat kort. Anropas igen = markeringen flyttas.
export function markeraDagensRatt(container: HTMLElement, id: number): void {
  // TODO
  const cards = container.querySelectorAll("article");
  for (const card of cards) {
    const isSelected = card.dataset.id === String(id);
    card.classList.toggle("dagens", isSelected);
  }
}
