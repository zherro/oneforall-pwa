import { v4 as uuidv4 } from 'uuid';
import StringUtils from './helpers/String.utils';

export class DataManager <T extends { id?: string }> {
    public data: T[] = [];

    constructor(data: T[]) {
        this.data = data;
    }

    // Adiciona um novo objeto à lista
    add(item: T): void {
        item.id = uuidv4();
        this.data.push(item);
    }

    // Atualiza um objeto existente na lista
    update(item: T): void {
        const index = this.data.findIndex(existingItem => existingItem.id === item.id);
        if (index !== -1) {
            this.data[index] = item;
        } else {
            throw new Error(`Item with id ${item.id} not found`);
        }
    }

    upsert(item: T): void {
        if(StringUtils.isEmpty(item.id)) {
            this.add(item);
        } else {
            this.update(item);
        }
    }

    // Remove um objeto da lista pelo id
    remove(id: string): void {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
        } else {
            throw new Error(`Item with id ${id} not found`);
        }
    }

    // Reordena a lista pelo atributo 'id'
    // reorder(): void {
    //     this.data.sort((a, b) => a.id - b.id);
    // }

     // Move um objeto para uma posição acima na ordem do array
     moveUp(id: string): void {
        const index = this.data.findIndex(item => item.id === id);
        if (index > 0) {
            const temp = this.data[index];
            this.data[index] = this.data[index - 1];
            this.data[index - 1] = temp;
        } else if (index === -1) {
            throw new Error(`Item with id ${id} not found`);
        }
    }

    // Move um objeto para uma posição abaixo na ordem do array
    moveDown(id: string): void {
        const index = this.data.findIndex(item => item.id == id);
        if (index !== -1 && index < this.data.length - 1) {
            const temp = this.data[index];
            this.data[index] = this.data[index + 1];
            this.data[index + 1] = temp;
        } else if (index === -1) {
            throw new Error(`Item with id ${id} not found`);
        }
    }

    // Obtém todos os dados
    getAll(): T[] {
        return this.data;
    }
}
