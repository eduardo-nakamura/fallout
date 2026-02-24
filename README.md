# 👱🏻‍♂️ Fallout Terminal

<details>
  <summary>🇺🇸 English Version (Click to expand)</summary>
  
  ## Overview
  Project details in English...
</details>

<details>
  <summary>🇧🇷 Versão em Português (Clique para expandir)</summary>
  
  ## Visão Geral
  Um emulador de terminais da franquia Fallout desenvolvido com React, Tailwind CSS e TypeScript. Este sistema permite acessar logs de terminais diretamente da RobCo Industries (via API da Fandom).

## ☢️ Funcionalidades
- **Acesso Multi-Database:** Escolha entre os bancos de dados de Fallout 3, New Vegas, Fallout 4 e Fallout 76.
- **Decodificação em Tempo Real:** Efeito de digitação (typewriter) fiel aos terminais originais, com som de teclado mecânico.
- **Vault-Tec Cache:** Integração com localStorage para carregamento instantâneo de logs previamente acessados (economizando banda do seu Pip-Boy).
- **Interface Responsiva:** Otimizado para monitores CRT (Desktop) e dispositivos móveis de wasteland.
- **Filtro Inteligente:** Pesquisa rápida de entradas de terminal por nome.

## 🛠️ Tecnologias Utilizadas
- **React 18** (Vite)
- **TypeScript** (Segurança e tipagem de dados da API)
- **Tailwind CSS** (Estilização atômica e design responsivo)
- **Fandom API** (Fonte dinâmica de dados de wikitext)
- **Lucide React** (Ícones de sistema)
- **IA** (Gemini e z.ai) para validação

## 💾 Instalação e Execução
Para rodar o terminal em sua estação de trabalho local:
1.  Clone o repositório:
    ```
    git clone https://github.com/eduardo-nakamura/fallout.git
    ```
2.  Instale as dependências:
    ```
    npm install
    ```
3.  Inicie o sistema:
    ```
    npm run dev
    ```   
## 🧪 Desafios Técnicos Superados
**Limpeza de Dados (Regex)**
Um dos maiores desafios foi converter o **Wikitext** bruto da Fandom em texto puro legível. Implementei um pipeline de Regex para:
- Remover tags <nowiki>.
- Limpar predefinições complexas como {{Transcript}} e {{Small}}.
- Escapar aspas e caracteres especiais para compatibilidade com JSON.

**Performance e UX**
Para garantir que a experiência não fosse prejudicada pela latência da API, foi desenvolvido um sistema de cache que armazena os logs limpos no navegador do usuário, reduzindo requisições repetidas.

## 📟 Licença
Distribuído sob a licença MIT. Veja LICENSE para mais informações.
</details>
<!-- 
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname
      }
      // other options...
    }
  }
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

````js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
``` -->
````
