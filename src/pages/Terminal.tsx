import { useState, useEffect } from 'react'

import { Button } from '../components/button'
import { TypewriterText } from '../components/TypewriterText';
// import terminal3 from '../data/fo3.json'
import terminal3 from '../data/fo3entries.json'
import terminal4 from '../data/fo4.json'
import terminalNV from '../data/fonv.json'

interface TerminalEntry {
  title: string;
  terminal: string;
  // O conteúdo pode ser um array de strings (texto) ou um array de outras entradas (sub-menu)
  content: string[] | TerminalEntry[];
}

export default function Terminal() {
  const [currentView, setCurrentView] = useState<string[]>([]);
  const [displayTitle, setDisplayTitle] = useState<string>('');
  const [selectedTerminal, setSelectedTerminal] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const selectTerminal = (game: string[]) => {
    setCurrentView(game);
    setIsSelected(true);
  }

  const handleEntryClick = (entry: string) => {
    const urlTitle = encodeURIComponent(entry.replaceAll(' ', '_'));
    setSelectedTerminal(urlTitle);
    setDisplayTitle(entry); 
    setContent('');         
    setLoading(true);       
    // // Se o conteúdo for uma lista de sub-objetos (como em Security Dossiers)
    // if (Array.isArray(entry.content) && typeof entry.content[0] === 'object') {
    //   setCurrentView(entry.content as TerminalEntry[]);
    //   setDisplayText(null); // Limpa o texto anterior
    //   setDisplayTitle('')
    // }

    // else if (Array.isArray(entry.content)) {
    //   setDisplayTitle(entry.title)
    //   setDisplayText(entry.content.join('\n\n'));
    // }
  };

  const handleBack = () => {
    setIsSelected(false);

    setDisplayTitle('');
  };

  useEffect(() => {
    if (!selectedTerminal) return; // Don't fetch if nothing is selected

    const fetchTerminal = async () => {
      const cachedData = localStorage.getItem(`terminal-${selectedTerminal}`);
      if (cachedData) {
        console.log("Loading from Vault-Tec Cache...");
        setContent(cachedData); // No need to JSON.parse if it's just a string
        setLoading(false);
        return;
      }

      setLoading(true); // Reset loading state for new fetch
      setError('');
      try {
        // const teste = `'''Vault 101 terminal entries''' are a series of [[Fallout 3 terminal entries|entries]] found on various terminals in [[Vault 101]] in ''[[Fallout 3]]''.\n\n==Desk terminal==\n{{Small|'''Note:''' ''This terminal is located on the [[Desk (Fallout 3)|desk]] in the security room. It is locked.{{Clarify}}''}}\n{{Transcript|text=\nVault 101 Security Cell Terminal\n}}\n\n===Lock Cell Door===\n{{Small|'''Note:''' ''This entry is accessible during [[Escape!]]''}}\n{{Transcript|text=\n\u003E Error Locking Cell Door...\n}}\n\n===Unlock Cell Door===\n{{Small|'''Note:''' ''This entry is accessible during [[Trouble on the Homefront]].''}}\n{{Transcript|text=\n\u003E Cell Door Unlocked...\n}}\n\n===CONFIDENTIAL===\n{{Small|'''Note:''' ''This entry is accessible during Trouble on the Homefront. Reading this entry adds the note [[Raid plans]] to the [[Lone Wanderer]]'s [[Pip-Boy 3000]].''}}\n{{Transcript|text=\nCONFIDENTIAL! \nTOP-LEVEL SECURITY ONLY!\n\nFrom: [[Paul Hannon Sr.|Chief Officer]]\nSubject: Raid on Rebels\n\nIn light of increased agitation from the rebel elements, I have come to the conclusion that we can no longer afford to be merciful to this scum. While some may hold out hope for a peaceful resolution, it's only a matter of time before they decide to take the fight to us. Or, worse yet, our families.\n\nI propose a midnight raid into their compound - live [[Ammunition|ammo]], zero tolerance. Make an example of the first two who fight back, and the rest will fall in line. We may lose a kid or two, but we'll save the Vault as a whole, and that's what counts.\n\nYou are not to inform the Overseer and some of our softer security guards about this plan, as they will only object and ensure our defeat. Once the deal's done, they'll see it was worth the price.\n\nThis'll show those scum what happens when you step out of line in our Vault.\n}}\n\n==Overseer's terminal==\n{{Small|'''Note:''' ''This terminal is located on the section of wall directly behind the overseer's desk in the overseer's office. It is locked.{{Clarify}}''}}\n{{Transcript|text=\nWelcome, [[Alphonse Almodovar|Overseer]].\n}}\n\n===View Security Dossiers===\n====[[Tunnel Snakes]]====\n{{Transcript|text=\nIf [[Butch DeLoria|Butch]] and his leather-clad delinquents accost Amata one more time, they'll have more to deal with than their acerbic teacher. \n\nTheir \"services\" have come in handy upon occasion, I must admit, but they're starting to become unruly. If [[dog]]s become feral, they must be put down. I'll have to remind Butch of that upon our next meeting.\n}}\n\n====Beatrice====\n{{Transcript|text=\nJust what Vault 101 needs -- an absent-minded, sexually repressed sycophant. [[Beatrice Armstrong|Beatrice]] has served Vault 101 admirably for years, but her mind is growing feeble. I'll have to speak with our good doctor about some kind of long-term pharmaceutical solution. \n\nWe may at least be able to keep her comfortable -- and quiet -- until she passes on.\n}}\n\n====Jonas====\n{{Transcript|text=\nI never should have assigned [[Jonas Palmer|Jonas]] as [[James (Fallout 3)|James]]' assistant. He was always too idealistic for his own good. Now he spends every waking minute with the good doctor, who gleefully fills his ears with even more idealistic nonsense. \n\nI've considered re-assigning him, but the truth is Jonas is a fine medic in his own right, and hiding him down in maintenance would be a terrible waste of resources.   \n}}\n\n====Amata====\n{{Transcript|text=\nEvery time I try to get Amata to open up, she just pushes me further and further away. Since she was a child, I've tried to instill in her those virtues that have made [[Vault 101|this Vault]] what it is today: loyalty, honesty, commitment, hard work. \n\nShe does try, and with a lot of guidance has grown into a fine young woman. That makes it all the sadder that she continues to alienate me. She looks at me and sees the Overseer, not the father that has cared for her alone -- alone! -- since she was an infant. \n}}\n\n===View Scouting Reports===\n====Report 2241-02-10====\n{{Transcript|text=\nAs our tests suggested, the immediate vicinity of the vault is no longer dangerously irradiated, although the background [[radiation]] is still well above safe levels. Pockets of more intense radiation appear to still be common, and all surface [[water]] seems to be undrinkable. We will need to carry ample supplies of [[Rad-X (Fallout 3)|Rad-X]] with us on all future surveys. But hazard suits do not seem to be necessary for general exploration.\n\nOur old maps are largely useless. The town of [[Springvale]] is an abandoned ruin, and all pre-War roads have disappeared or are no longer passable.\n\nWe encountered a group of [[Giant ant (Fallout 3)|monstrous ants]] which appeared to confirm [[Mackay]]'s theories of [[Radiation#Mutations|mutation]] due to extended exposure to radiation. We drove off the ants with gunfire and collected several specimens for study upon return to the vault (see Exhibit A).\n\nThe good news is that [[human]] civilization still survives, despite everything! We discovered a settlement known as \"[[Megaton]]\" (see Exhibit B), whose inhabitants, although somewhat wary at first, soon welcomed us into their town. \n\nWe spent a good deal of time in Megaton, and learned a great deal about the \"[[Capital Wasteland]]\" (as the area around [[Washington, D.C.|Washington D.C.]] is now called) from them. Megaton is a fortified outpost of \"civilization\" (of sorts), but it seems that Giant Ants are the least of the dangers of this new world. We agreed that it was prudent to return to the Vault immediately to revise our survey plans in light of what we have learned. [[Lewis (Fallout 3)|Lewis]] and [[Agnes Taylor|Agnes]] remained in Megaton to serve as \"ambassadors\" and continue to collect information until we return.\n\n[[Anne Palmer]], Survey Team Leader\n[[Timeline#2241|February 10, 2241]]\n}}\n\n====2241-02-10 Exhibit A====\n[[File:Exhibit A.png|200px]]\n\n====2241-02-10 Exhibit B====\n[[File:Exhibit B.png|200px]]\n\n===Vault-Tec Instructions===\n====Letter from Doctor Stanislaus Braun====\n{{Transcript|text=\nA Letter to the [[Overseer]] from [[Stanislaus Braun|Dr. Stanislaus Braun]]:\n\nIf you are reading this, emergency [[Vault]] internment procedures have been initiated and you and your control group have been sealed into your Vault. Congratulations! You are now a vital part of the most ambitious program ever undertaken by Vault-Tec.\n\nIf you have not yet read your sealed orders, do so now. They will outline the experimental protocols assigned to your control group. Please remember that deviation from these protocols in any way will jeopardize the success of the program, and may be considered grounds for termination by Vault-Tec Corporation (as outlined in your Employment Agreement).\n\nYour Vault may or may not have been selected to receive a G.E.C.K. module. Please see Attachment A for details.\n\nDoctor Stanislaus Braun\nDirector, Societal Preservation Program\n[[Vault-Tec Corporation]]\n}}\n\n====Attachment A====\n{{Transcript|text=\nVault 101 will not receive a [[G.E.C.K. (Fallout 3)|G.E.C.K.]] module, and should operate under the guidelines laid forth in the Overseer's sealed orders.\n}}\n\n====Vault-Tec Scientific Entry: The G.E.C.K.====\n{{Transcript|text=\nThe G.E.C.K. is, quite simply, the most advanced piece of [[technology]] ever developed by Vault-Tec -- a terraforming module capability{{sic}} of creating life from complete lifelessness. \n\nAfter riding out the storm of nuclear Armageddon in a Vault-Tec patented vault, residents can then activate the G.E.C.K., and create a new Earthen paradise -- craters and dust will give way to rolling grasslands and sparkling clear water. Of course, due to time and monetary constraints, not every vault will be equipped with a G.E.C.K. module.\n}}\n\n===Open Overseer's Tunnel===\n{{Transcript|text=\n\u003E Opening...\n}}\n\n===View External Contact Report===\n{{Small|'''Note:''' ''This entry is only accessible during Trouble on the Homefront. Reading this entry adds the note [[Contact Report: \"Enclave\"]] to the Lone Wanderer's Pip-Boy 3000.''}}\n{{Transcript|text=\nThe Vault recently received unexpected radio contact over the governmental Vault-Tec frequency, from an organization calling itself \"The [[Enclave]].\"\n\nGovernmental codes are valid according to the Vault's ancient records, and The Enclave put forth an offer of amnesty and unity with the official remnants of the [[United States government|American government]], in exchange for access to the Vault and its data stores. They claim that our Vault passwords no longer match their records, preventing them from extending their offer in person.\n\nAfter brief negotiation, I have refused entrance to this \"Enclave.\" I cannot trust my Vault and its inhabitants to an unknown factor, much less one that would so gallantly suggest abandoning our vault's great mission. \n\nAll the more reason to prevent the rebels from opening the Vault to the likes of them.\n}}\n\n===View Security Dossiers===\n{{Small|'''Note:''' ''These entries are accessible during Trouble on the Homefront.''}}\n\n====Rebels====\n{{Transcript|text=\nAn alliance of rebels has formed in my Vault, dedicated to the wholly destructive goal of re-opening the Vault to the outside world. Amata and [[Edwin Brotch]] are the leaders of the band, with those ridiculous Tunnel Snakes making up its muscle, along with a handful of other youths and naive idealists.\n\nAttempts to isolate and demoralize the group are proceeding apace: Edwin Brotch has been jailed for his attempt to lead a direct attempt to open the Vault's door, and their members have holed up in the old clinic and schoolroom. Their dwindling food and proximity to the dangerous \"Dr. Andy\" are sure to drain the morale from their rebellion, until they give up and are welcomed back into our happy family again.\n}}\n\n====Amata====\n{{Transcript|text=\nIt pains me dearly to know that Amata is behind the rebellious element in my Vault. If she weren't their leader, it would be a simple matter to break their spirits and bring them back in line with the Vault's time-proven isolation plan.\n\nBut with her as a central figure in their rebellion, I must refrain from the more persuasive tactics at security's disposal. I will not repeat the mistakes of that night again. The Vault cannot afford it, and I cannot bear to drive my daughter further away from me.\n\nDespite everything, I take great pride in her natural talent for leadership. When she inevitably comes around, I feel she will make a worthy successor to the position of Overseer.\n}}\n\n==Vault 101 medical data system==\n{{Small|'''Note:''' ''This terminal is located on the desk in the vault's clinic office. It is inaccessible during Escape!''}}\n{{Transcript|text=\nRemember: Medical files are confidential!\n}}\n\n===Patient Files===\n====[[Freddie Gomez]]====\n{{Transcript|text=\nFreddie's VDS is getting worse. Most days, he can't even get out of bed. When he does manage to function, Freddie hides his insecurities and low self esteem behind a bully's mask.\n\n[[Vault-Tec medical protocol]]s dictate the prescription of anti-anxiety medication when [[Vault depressive syndrome|Vault Depressive Syndrome]] is involved, but do I really want to string the kid out on Chlorpromazine for the rest of his life?\n}}\n\n====Stanley====\n{{Transcript|text=\n[[Stanley Armstrong|Stanley]] continues to suffer from severe and chronic head pain. I've been feeding him aspirin like it's candy, but I'm reticent to give him anything stronger. He blames the lighting in his quarters, and though eyestrain is certainly compounding the problem, the headaches are actually a symptom of overwork and lack of sleep. \n\nKnowing Stanley -- and the schedule the Overseer has him on -- the problem isn't likely to get better anytime soon. So it's aspirin, indefinitely.\n}}\n\n====[[Amata Almodovar|Amata]]====\n{{Transcript|text=\nOnce again, the Overseer has insisted on being in the room for Amata's examination, throwing any inkling of doctor-patient confidentiality right out the window. I know he doesn't trust me; he never has. But I honestly believe the reason he attends his daughter's medical appointments is because he doesn't trust her. That's as ridiculous as it is sad. Amata's a great girl, and the chance of her doing something stupid - pregnancy, [[syphilis]], whatever - is so unlikely it's not even worth mentioning. \n}}\n\n===Experiments===\n====Experiment 27CE====\n{{Transcript|text=\nThe cells are still replicating normally. No mutation. Thank God. If whatever's out there could penetrate this Vault, I can't even begin to imagine what the Overseer would do.\n}}\n\n====Experiment [[PP216]]====\n{{Transcript|text=\nAfter \"borrowing\" a few more water chips and rerouting some of the power here in the clinic, I've finally been able to affect the latest sample. It's not much, but considering what I have to work with it, a definite step in the right direction. \n\nBut this new experiment was also monumental for another reason: it's the first time Jonas has assisted me. He's suspected forever, I know, so I guess it was inevitable. And his help has been invaluable. I just hope he knows what he's gotten himself into.\n}}\n\n==Vault 101 maintenance terminal==\n{{Small|'''Note:''' ''This terminal is located on a console in the Vault 101 sub-level. It has a Hard-difficulty lock.''}}\n{{Transcript|text=\nVault-Tec Inc. -  Vault 101\nSettle in and stay a while!\n}}\n\n===Test Hydroponics Systems===\n{{Small|'''Note:''' ''This entry is conditional.{{clarify}}''}}\n{{Transcript|text=\n\u003E Hydroponics fully functional.\n}}\n{{Small|'''Note:''' ''This entry is conditional.{{clarify}}''}}\n{{Transcript|text=\nWater Chip Undergoing Service. \n\nSystem temporarily suspended. Do not run purge - vital systems may be compromised.\n}}\n{{Small|'''Note:''' ''This entry is conditional.{{clarify}}''}}\n{{Transcript|text=\nSystem Inactive - No Water Chip Located!\n\nContact your Vault-Tec representative immediately for service. Evacuate to safe distance until repairs are complete.\n}}\n\n===Test Air Filtration===\n{{Transcript|text=\n\u003E Filtration systems fully functional.\n}}\n\n===Begin Water Chip Service===\n{{Small|'''Note:''' ''This entry is conditional.{{clarify}}''}}\n{{Transcript|text=\n\u003E Service Disabled - See Vendor\n}}\n\n====Run Water Chip Diagnostic====\n{{Small|'''Note:''' ''This entry is conditional.{{clarify}}''}}\n{{Transcript|text=\n\u003E All systems functional.\n}}\n{{Small|'''Note:''' ''This entry is conditional.{{clarify}}''}}\n{{Transcript|text=\n\u003E No water chip found. Contact distributor.\n}}\n\n====Begin Manual Service====\n{{Transcript|text=\n\u003E System disengaged - do not run purge!\n}}\n\n====End Manual Service====\n{{Small|'''Note:''' ''This entry is conditional.{{clarify}}''}}\n{{Transcript|text=\n\u003E System re-engaged. Enjoy your water!\n}}\n{{Small|'''Note:''' ''This entry is conditional.{{clarify}}''}}\n{{Transcript|text=\n\u003E Error: System cannot be re-engaged.\n}}\n\n====Run Systems Purge====\n{{Small|'''Note:''' ''This entry is if the manual service option is used.''}}\n{{Transcript|text=\n\u003E Purge error. Additional materials purged.\n}}\n{{Small|'''Note:''' ''This entry is if the manual service option is not used.''}}\n{{Transcript|text=\n\u003E Impurities purged. Cleanliness restored.\n}}\n{{Small|This entry is if the manual service option is not used.}}\n{{Transcript|text=\n\u003E No purge controller located.\n}}\n\n[[Category:Fallout 3 terminal entries]]\n[[Category:Vault 101]]\n\n[[fr:Entrées de terminal de l'Abri 101]]\n[[pt:Entradas de terminal do Vault 101]]\n[[ru:Убежище 101 — записи в терминалах]]`
        // const cleanContent = teste
        //   .split('[[Category:Fallout 3 terminal entries')[0]
        //   .replace(/{{Transcript\|text=/g, '')
        //   .replace(/{{Small\|[\s\S]*?}}/g, '')             // Remove o bloco {{Small|...}} inteiro
        //   .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1') // Remove links mantendo o texto
        //   .replace(/''}}/g, '')
        //   .replace(/}}/g, '')
        // setContent(cleanContent);

        // return

        const url = `https://fallout.fandom.com/api.php?action=parse&page=${encodeURIComponent(selectedTerminal.replaceAll(' ', '_'))}&prop=wikitext&format=json&origin=*`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.parse && data.parse.wikitext) {
          console.log("Saving to Vault-Tec Cache...");
          const cleanContent = data.parse.wikitext['*']
            .split('[[Category:Fallout 3 terminal entries')[0]
            .replace(/{{Transcript\|text=/g, '')
            .replace(/{{Small\|[\s\S]*?}}/g, '')
            .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1')
            .replace(/''}}/g, '')
            .replace(/}}/g, '')
            .trim();
          localStorage.setItem(`terminal-${selectedTerminal}`, cleanContent);

          setContent(cleanContent);

        } else {
          setError("DATA CORRUPTED: TERMINAL NOT FOUND");
        }
      } catch (err) {
        console.log(err)
        setError("CONNECTION ERROR: LINK TO MAINframe LOST");
      } finally {
        setLoading(false);
      }
    };

    fetchTerminal();
  }, [selectedTerminal]);

  return (
    <main className="grid grid-cols-2 gap-10">
      {!isSelected && (
        <section className='flex flex-col gap-2 col-span-2'>
          <Button onClick={() => selectTerminal(terminal3)}>
            Fallout 3 Terminals
          </Button>
          {/* <Button onClick={() => selectTerminal(terminalNV.entries)}>
            Fallout New Vegas Terminals
          </Button>
          <Button onClick={() => selectTerminal(terminal4.entries)} >
            Fallout 4 Terminals
          </Button> */}
        </section>
      )}
      {isSelected && (
        <>
          <section className="flex flex-col gap-2">
            {currentView.map((item, index) => (
              <Button key={index} onClick={() => handleEntryClick(item)}>
                {item} a
              </Button>
            ))}
            <Button onClick={handleBack} className="mt-4">
              BACK
            </Button>
          </section>
          <section>
            <h3 className='text-2xl'><TypewriterText key={displayTitle} text={displayTitle} cursor={false} /></h3>
            {content && (

              <p className='text-xl whitespace-pre-wrap'>
                <TypewriterText key={content} text={content} />

              </p>
            )}
          </section>
        </>

      )}
    </main>
  )
}
