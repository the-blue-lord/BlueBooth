# Nuovo aggiornamento per supportare multiplayer



## Riorganizzazione cartelle e sottocartelle

Aggiunte alla repository dependencies per permettere il gioco multiplayer, ora i file da modificare che andranno a costituire le pagine del sito assieme ai relativi styles e script vari si trovano nella cartella  `[repo]/public`, gli altri file servono alla compilazione di quest'ultima cartella e non vanno modificati



## Introduzione della compilazione dei file

I file che verranno effettivamente serviti dal server al client che accederà al sito, sempre per le necessita multiplayer dei giochi, sono quelli nella cartella `[repo]/build`, che contiene i file compilati a partire dai file presenti nella cartella `[repo]/public`
> [!IMPORTANT]
> L'assenza della cartella `[repo]/build` non è un problema, al momento della compilazione se non presente viene creata automaticamente



## Spiegazione funzionamento compilazione

I file compilati sono effettivamente i file html, css e js. Vanno compilati per includere correttamente i moduli javascript che altrimenti i browser non sono in grado di gestire e che sono necessari per il multiplayer.

Ergo accedere direttamente al codice sorgente (quello nella cartella `[repo]/public`), quindi aprire un file html con solo collegamenti a file `.css` o anche `.js` (a patto che questi ultimi non includano moduli, cosa difficile) non crea alcun tipo di problema, e anzi risparmia tempo saltando la compilazione dei file e rimuovendo un passaggio futile.

Nel momento però in cui si renda necessario accedere ad un file di cui è necessaria la compilazione, poiché implementa moduli javascript, occorre seguire i seguenti passaggi:
* Compilare il codice sorgente della cartella `[repo]/public` (spiegazione più avanti)
* Startare un server su localhost con Simple Web Server (spiegazione più avanti)
* Accedere ai file di `[repo]/build` tramite il server (spiegazione più avanti)

> [!TIP]
> Nel caso in cui si accedesse ad un file del codice sorgente che implementa moduli javascript, ce ne si accorgerà immediatamente dal momento che non si vedranno caricati alcuni elementi e la pagina apparirà _broken_

> [!TIP] 
> Accedere alternativamente ai file della cartella `[repo]/build` dopo la compilazione risulterà in problemi simili a quelli riportati sopra, in quanto non verranno caricati nemmeno i file css. Per poter caricare correttamente i file è necessario che non vengano aperti sul browser tramite `file:///`, ma che siano serviti da un server in grado di organizzare le richieste ricevute che può anche essere semplicemente hostato sulla propria rete locale.



## Applicazioni e dependencies necessarie
Allo scopo di poter compilare i file e startare un server sulla propria rete locale, si rendono necessarie due installazioni: `node` e `npm`per la compilazione e _Simple Web Server_ per l'hosting

### Node.js (javascript runtime environment) e npm (node package manager)
Verificare prima di non avere `node` già installato:
* Aprire un terminale (in windows: premere `[tasto windows] + R`, scrivere `cmd` e premere `[enter/invio]` oppure aprire applicazione `Command prompt`)
* Digitare `node -v`
  * Non da errore ma riporta una versione per `node`
    * `node` è già installato ed è tutto apposto
  * Da errore dicendo che il comando è inesistente o non trovato (`node` e `npm` non sono installati)
    * Andare sul sito ufficiale di node (https://nodejs.org/en/download), scaricare l'ultima versione e voilà, sono installati entrambi

### Simple Web Server
Per installare _Simple Web Server_ ci sono due opzioni:
* Andare sul sito ufficiale (https://simplewebserver.org/) e scaricare l'installatore, eseguire l'installatore e voilà, applicazione installata
* Se su windows, andare sul Microsoft Store e scaricare _Simple Web Server_ (se non si è sicuri se sia l'applicazione corretta confrontarsi col sito fornito sopra)



## Utilizzare applicazioni e dependencies

### Compilare/buildare i file con `npm`
* Aprire un terminale (in windows: premere `[tasto windows] + R`, scrivere `cmd` e premere `[enter/invio]` oppure aprire applicazione `Command prompt`)
* Navigare alla cartella della repository tramite `cd`
* Eseguire il comando `npm i`
* Eseguire il comando `npm run build`

### Startare server con _Simple Web Server_
* Aprire l'applicazione _Simple Web Server_
* Premere su "_New Server_" in basso a destra
* Impostare "_Folder Path_" sul percorso assoluto della cartella `[repo]/build`
* Verificare che "_Port_" sia impostato su "_8080_"
* In "_Basic Options_" deselezionare l'opzione "_Show directory listing_"
* In "_Error Pages_" impostare "_Custom 404 page file path_" su "`errors/404.html`
* Premere su "_Create Server_" in basso a destra
* Verificare dal pannello di _Simple Web Server_ che il server appena creato sia attivo
* Ora il sito e le pagine sono accessibili a http://localhost:8080 (solo esclusivamente dal computer su cui l'applicazione sta runnando il server _ovviamente_)