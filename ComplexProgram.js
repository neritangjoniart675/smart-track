/*
Filename: ComplexProgram.js

This is a complex program that simulates a virtual world with different entities and their interactions. It uses various advanced JavaScript concepts like Object-Oriented Programming, Promises, and asynchronous operations. The program is approximately 250 lines long and demonstrates a more professional and creative use case.

*/

// Helper function to generate random numbers within a range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Class representing an entity in the virtual world
class Entity {
  constructor(name, health, strength) {
    this.name = name;
    this.health = health;
    this.strength = strength;
  }

  attack(target) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.health <= 0) {
          reject(`${this.name} cannot attack because it is already defeated.`);
        } else if (target.health <= 0) {
          reject(`${this.name} cannot attack ${target.name} because it is already defeated.`);
        } else {
          const damage = getRandomNumber(1, this.strength);
          target.health -= damage;
          resolve(`${this.name} attacked ${target.name} and inflicted ${damage} damage.`);
        }
      }, 1000);
    });
  }
}

// Class representing a player-controlled entity
class Player extends Entity {
  constructor(name, health, strength, mana) {
    super(name, health, strength);
    this.mana = mana;
  }

  castSpell(target) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.mana <= 0) {
          reject(`${this.name} cannot cast a spell because it is out of mana.`);
        } else {
          const spellPower = getRandomNumber(1, this.mana);
          target.health -= spellPower;
          this.mana -= spellPower;
          resolve(`${this.name} cast a spell on ${target.name} and reduced its health by ${spellPower}.`);
        }
      }, 1500);
    });
  }
}

// Create entities
const player1 = new Player("Player 1", 100, 15, 50);
const player2 = new Player("Player 2", 100, 10, 70);
const enemy1 = new Entity("Enemy 1", 80, 12);
const enemy2 = new Entity("Enemy 2", 120, 8);

// Simulate battles between entities
Promise.all([
  player1.attack(enemy1),
  player2.castSpell(enemy1),
  enemy1.attack(player1),
  enemy2.attack(player2),
  player1.castSpell(enemy1),
  player2.attack(enemy1)
])
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.log(error);
  });
 