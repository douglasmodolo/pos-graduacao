# 📚 Tecnologias e Pacotes do Projeto

Este repositório reúne diversas tecnologias e pacotes utilizados no desenvolvimento de aplicações modernas com Node.js e TypeScript. Abaixo, uma explicação detalhada de cada ferramenta, incluindo exemplos de uso e conceitos importantes.

---

## 🌐 Node.js

[Node.js](https://nodejs.org/) é uma plataforma de desenvolvimento que permite a execução de JavaScript no servidor. Com ele, podemos criar APIs, servidores web, bots e muito mais.

### Características principais:
- Baseado no motor V8 (Google Chrome).
- Assíncrono e orientado a eventos.
- Excelente para aplicações escaláveis e em tempo real.

> Exemplo de servidor simples com Node puro:
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.write('Hello World!');
  res.end();
});

server.listen(3000, () => console.log('Servidor rodando na porta 3000'));
```

---

## 📦 TypeScript

[TypeScript](https://www.typescriptlang.org/) é um superset do JavaScript que adiciona **tipagem estática** ao código. Ele nos ajuda a capturar erros em tempo de desenvolvimento, antes de rodar o código.

### Benefícios:
- Tipagem estática (segurança no desenvolvimento).
- Melhor autocompletar (intellisense).
- Suporte a recursos modernos do JavaScript.

> Exemplo:
```typescript
function soma(a: number, b: number): number {
  return a + b;
}

console.log(soma(2, 3)); // 5
```

---

## ⚙️ TSC (TypeScript Compiler)

O `tsc` é o compilador oficial do TypeScript. Ele transforma os arquivos `.ts` em `.js` para serem executados no Node.js.

### Comandos básicos:
```bash
tsc arquivo.ts
```

### Compilar o projeto inteiro (com `tsconfig.json` configurado):
```bash
tsc
```

### Assistente para criar o `tsconfig.json`:
```bash
tsc --init
```

---

## ⚡ Fastify

[Fastify](https://www.fastify.io/) é um framework web para Node.js, **rápido e eficiente**, ideal para APIs modernas.

> Exemplo básico:
```typescript
import Fastify from 'fastify';

const app = Fastify();

app.get('/ping', async (request, reply) => {
  return { pong: 'it worked!' };
});

app.listen({ port: 3000 }, () => console.log('Server running on port 3000'));
```

---

## 📜 @types/node

Pacote de **tipos do Node.js** para TypeScript.

### Instalação:
```bash
npm install @types/node --save-dev
```

> Exemplo:
```typescript
import { readFileSync } from 'fs';

const data = readFileSync('file.txt', 'utf-8');
console.log(data);
```

---

## 🚀 TSX

[TSX](https://www.npmjs.com/package/tsx) é uma ferramenta que permite rodar diretamente arquivos `.ts` e `.tsx`.

### Execução:
```bash
npx tsx src/index.ts
```

---

## ✅ ESLint

[ESLint](https://eslint.org/) é uma ferramenta de análise de código.

### Instalação:
```bash
npm install eslint --save-dev
```

### Inicialização:
```bash
npx eslint --init
```

---

## 🛢️ Knex.js

[Knex.js](https://knexjs.org/) é um **query builder** para SQL em Node.js.

> Exemplo de query:
```typescript
import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

db('users').where({ id: 1 }).select('*').then(console.log);
```

---

## 🛠️ Migrations (Knex.js)

### Criar migration:
```bash
npx knex migrate:make create_users_table
```

### Rodar migrations:
```bash
npx knex migrate:latest
```

---

## 🔐 Variáveis de Ambiente

> Exemplo `.env`:
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/db
PORT=3000
```

> Uso:
```typescript
import 'dotenv/config';
console.log(process.env.DATABASE_URL);
```

---

## ✅ Zod

[Zod](https://zod.dev/) é uma biblioteca de **validação de dados** em TypeScript.

> Exemplo:
```typescript
import { z } from 'zod';

const userSchema = z.object({
  name: z.string(),
  age: z.number().min(18)
});

const user = userSchema.parse({ name: 'John', age: 25 });
```

---

## 🍪 Cookies (Fastify)

Maneiras de manter o contexto entre requisições:

- **Inclusão**
- **Utilização**
- **Expiração**

---

## 🏷️ Tipos Personalizados no TypeScript

### `declare module`
O TypeScript permite criar módulos personalizados para definir tipos adicionais.

> Exemplo:
```typescript
declare module 'meu-modulo' {
  export function minhaFuncao(): void;
}
```

---

## 🧪 Testes

### Tipos de testes:
- **Testes unitários**: validam o comportamento de uma única unidade de código, como uma função.
- **Testes de integração**: verificam a comunicação entre diferentes partes da aplicação.
- **Testes E2E (end-to-end)**: simulam a interação do usuário com a aplicação completa.

A **pirâmide de testes** sugere que devemos ter mais testes unitários e menos testes de integração e E2E, pois testes unitários são mais rápidos e fáceis de manter.

### Bibliotecas recomendadas:
- **Vitest**: framework de testes rápido e moderno.
- **Supertest**: útil para testar APIs HTTP.

> **Importante:** Nunca crie testes que dependem de outros testes. Se um teste precisa do outro, eles deveriam ser o mesmo teste.

---

## 🚀 Deploy

Para realizar o deploy de uma aplicação Node.js, você pode utilizar serviços como:
- **Vercel**
- **Heroku**
- **Railway**
- **Render**

### **TSUP**
[TSUP](https://github.com/egoist/tsup) é um empacotador TypeScript que facilita a compilação do código.

### Instalação:
```bash
npm install tsup --save-dev
```

### Compilar o código:
```bash
npx tsup src/index.ts --format esm,cjs --dts
```
