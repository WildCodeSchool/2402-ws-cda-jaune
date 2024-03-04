// Capitalization and Mutability

export function capitalizeWord(word: string): string {
  const capitalized = word[0].toUpperCase()+word.slice(1)
  return capitalized
}

/* Notes
- On ne mute pas les paramètres
  -> Recréer une string from scratch
*/

// -----------------------------------------------------------------------

// Get the integers between two numbers

export function range(startNum, endNum)   
{  
  if(endNum===startNum) return []
  if(endNum<startNum) return [] // ?

  let answers: number[] = []
  for(let i=startNum+1;i<endNum;i++) {
    answers.push(i)
  }
  return answers
};

/* Notes
- Gérer les cas limites
  -> endNum<startNum => boucle infinie
  -> startNum a une partie flottante => toutes les réponses doivent faire un Math.floor()
*/

// -----------------------------------------------------------------------

// Array plus array

export function arrayPlusArray(arr1: number[], arr2: number[]) {
  return [...arr1, ...arr2].reduce( (acc, curr)=>{
      return acc+curr
  }, 0 )
}

/* Notes
- On peut boucler chaque tableau individuellement, ou les merger avant de boucler
  -> Utiliser spread
- Une valeur à partir d'un tableau ?
  -> reduce
*/

// -----------------------------------------------------------------------

// Invert values
export function invert(array: number[]) {
  return array.map(elt=>-elt)
}
/* Notes
- Pas de cas limites (que des integers)
- Un tableau à partir d'un tableau ?
  -> map
  l'opposé en maths est la valeur multipliée par -1
*/

// -----------------------------------------------------------------------

// Sum Arrays

export function sum (numbers: number[]) {
  return numbers.reduce( (acc, curr)=>acc+curr,0)
};

/* Notes
- Même que plus haut, en plus simple
  -> pratiquer la syntaxe racourcie ?
- Une valeur à partir d'un tableau ?
  -> reduce
*/

// -----------------------------------------------------------------------

// Price of Mangoes
export function mango(quantity: number, price: number): number{
    /* WRONG
    const nbBoughtMangoes=Math.floor(quantity*2/3)
    return nbBoughtMangoes*price */

    return (quantity - Math.floor(quantity/3))*price
}

/* Notes
- On paie/economie des mangues entières
  -> Math.floor
- On paie deux tiers de nos mangues

- Exo planté, merci @Valérie !
*/

// -----------------------------------------------------------------------

// Hello, Name or World!
export function hello(name?: string) {
  if(!name || !name.length) return "Hello, World!"

  const cleanName=name[0].toUpperCase()+name.slice(1).toLowerCase()
  return `Hello, ${cleanName}!`;
}

/* Notes
- Basé sur un exo plus haut
- utiliser toLowerCase
- paramètre optionnel
*/

// -----------------------------------------------------------------------

// String repeat
export function repeatStr(n: number, s: string): string {
  // Cheat mode ON
  //return s.repeat(n)

  let result="";
  for(let i=0;i<n;i++){
    result+=s
  }
  return result
}

/* Notes
- ... ?
*/


// -----------------------------------------------------------------------

// Who likes it?
export const likes = (a : string[]) : string => {
  switch(a.length) {
      case 0:
      return "no one likes this"
      case 1:
      return `${a[0]} likes this`
      case 2:
      return `${a[0]} and ${a[1]} like this`
      case 3:
      return `${a[0]}, ${a[1]} and ${a[2]} like this`
      default:
      return `${a[0]}, ${a[1]} and ${a.length-2} others like this`      
  }
}

/* Notes
- "En fonction de" la taille du tableau
  -> Switch
- Attention aux accords en anglais
*/

// -----------------------------------------------------------------------

// Evens times last

export function evenLast(numbers) {
  if(!numbers.length) return 0;
  let sum=0;
  for(let i=0; i<numbers.length; i+=2) {
    sum+=numbers[i] 
  }
  // console.log("sum="+sum)
  // console.log("last="+numbers[numbers.length-1])
  return sum*numbers[numbers.length-1]
}

/* Notes
- Une valeur à partir d'un tableau ?
  -> reduce
  - ... Ou pas, ici le reduce nous compliquerait la tache pour recuperer un index arbitraire
    -> for
- Erreur -> log pour comprendre où est la boulette
*/

// -----------------------------------------------------------------------

// Small enough? - Beginner
export function smallEnough(a: number[], limit: number): boolean{
  return a.every(elt=>elt<=limit)

  //return !a.some(elt=>elt>limit)
}
/* Notes
- Tous les elements d'un tableau respectent une condition
  - some
- Inverser la condition
*/

// -----------------------------------------------------------------------

// Get the mean of an array
export function getAverage(marks: number[]){
  return Math.floor(marks.reduce( (acc, curr)=>acc+curr, 0 )/marks.length)
}

/* Notes
- Une valeur (somme des notes) à partir d'un tableau 
  -> reduce
- Diviser par le nombre (length)
- Ne pas oublier le Math.floor
*/

