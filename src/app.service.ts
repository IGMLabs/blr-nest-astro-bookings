import { Injectable } from "@nestjs/common";
import { Client } from "./models/client.interface";
import { ClientDto } from "./models/client.dto";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }

  public multiply(someNumber: number, otherNumber: number): number {
    const multiply = someNumber * otherNumber;
    return multiply;
  }

  public division(someNumber: number, otherNumber: number): number {
    const division = someNumber / otherNumber;
    return division;
  }

  public division2(someNumber: number, otherNumber: number): number {
    if (otherNumber === 0) throw new Error(`${otherNumber} is CERO`);
    const division = someNumber / otherNumber;
    return division;
  }

  public squareRoot(someNumber: number): number {
    const sqrt = Math.sqrt(someNumber);
    return sqrt;
  }

  public saveClient(clientDto: ClientDto): Client {
    const client: Client = { ...clientDto };
    client.id = Math.random().toString();
    return client;
  }

  public updateClient(clientId: string, client: Client): Client {
    if (clientId !== "") {
      throw new Error("Not found: " + clientId);
    }
    return client;
  }
}
