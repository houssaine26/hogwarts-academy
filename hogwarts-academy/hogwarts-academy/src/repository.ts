import type { Wizard, Spell,NewWizard,House} from "./types";
import { Log, MeasureTime } from "./decorators";

export class Repository<T extends { id: number }> {
  private items: T[] = [];

  @Log
  add(item: T): void {
    this.items.push(item);
  }

  @MeasureTime
  findById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }

  update(id: number, changes: Partial<T>): boolean {
    const item = this.findById(id);

    if (!item) return false;

    Object.assign(item, changes);
    return true;
  }
}

export class WizardRepository extends Repository<Wizard> {
        addWizard(data: NewWizard):Wizard{
          const currentWizards = this.getAll();
          const nextId = currentWizards.length > 0 ? Math.max(...currentWizards.map(w=>w.id)) +1:1;
          const fullWizard: Wizard ={
            id:  nextId,
            name: "Harry Potter",
            house: "Gryffindor",
            level: 1,
            active: true      };
     super.add(fullWizard);
     return  fullWizard;}findByHouse(house: House): Wizard[] {
    return this.getAll().filter(wizard => wizard.house === house);
  }
}
export class SpellRepository extends Repository<Spell> {}
