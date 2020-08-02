# JETPAX BACKEND

## Style Guides Commit Messagens

##### - Devemos escrever em inglês e na forma imperativa. Ou seja, você precisa sempre estar apto a completar a seguinte frase:

> If applied, this commit will ** `your subject line here`**.

##### - Primeira linha deve ter no máximo 72 caracteres:

> Doc commit message styleguide

##### - Considere usar um emoji no início da mensagem de commit.

> :memo: Doc commit message styleguide.

##### - Descreva os detalhes do commit

> :memo: Doc commit message styleguide.
>
> Add the file empty to write style guide to message commits.

##### Lista de emoji

| Emoji              | Code                 | Commit Type                                   |
| ------------------ | -------------------- | --------------------------------------------- |
| :tada:             | `:tada:`             | initial commit                                |
| :art:              | `:art:`              | quando melhorar a estrutura/formato do código |
| :racehorse:        | `:racehorse:`        | quando melhorar a performance                 |
| :memo:             | `:memo:`             | quando escrever alguma documentação           |
| :bug:              | `:bug:`              | quando corrigir um bug                        |
| :fire:             | `:fire:`             | quando remover códigos ou arquivos.           |
| :green_heart:      | `:green_heart:`      | quando corrigir uma build no CI               |
| :white_check_mark: | `:white_check_mark:` | quando adicionar testes                       |
| :lock:             | `:lock:`             | quando melhorar a segurança                   |
| :arrow_up:         | `:arrow_up:`         | quando der upgrade em dependências            |
| :arrow_down:       | `:arrow_down:`       | quando der downgrade em dependências          |
| :poop:             | `:poop:`             | código deprecated                             |
| :construction:     | `:construction:`     | em construção                                 |
| :rocket:           | `:rocket:`           | nova feature                                  |
| :see_no_evil:      | `:see_no_evil:`      | gambiarra                                     |
| :gift:             | `:gift:`             | nova versão                                   |

### Exemplo

```bash
git commit -m ":memo: Add Contribution Instructions


The READEME.md file was created with the instructions of
how to make a good commit"
```
