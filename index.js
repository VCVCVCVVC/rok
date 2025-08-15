document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        ar: {
            name: "الاسم",
            tier: "الطبقة",
            specialties: "التخصصات",
            bestUse: "أفضل استخدام",
            rarity: {
                legendary: "أسطوري",
                epic: "ملحمي",
                elite: "نخبة",
                advanced: "متقدم",
            },
            tierNames: {
                'new': 'جديد',
                'unknown': 'غير معروف',
                'unranked': 'غير مصنف'
            },
            troopTypes: {
                infantry: 'مشاة',
                cavalry: 'فرسان',
                archers: 'رماة',
                gathering: 'جمع',
                support: 'دعم',
                peacekeeping: 'حفظ سلام',
                leadership: 'قيادة',
                conquering: 'غزو',
                skill: 'مهارة',
                defense: 'دفاع',
                attack: 'هجوم',
                siege: 'حصان',
                training: 'تدريب',
            },
            details: 'تفاصيل',
            searchPlaceholder: 'ابحث عن قائد...',
            noResults: 'لا توجد نتائج مطابقة.',
            sortBy: 'ترتيب حسب:',
            builds: 'أفضل البناءات:',
            pairings: 'أزواج القادة:',
            primary: 'أساسي',
            secondary: 'ثانوي',
            role: 'الدور',
            resourceBonus: 'مكافأة الموارد',
        },
        en: {
            name: "Name",
            tier: "Tier",
            specialties: "Specialties",
            bestUse: "Best Use",
            rarity: {
                legendary: "Legendary",
                epic: "Epic",
                elite: "Elite",
                advanced: "Advanced",
            },
            tierNames: {
                'new': 'NEW',
                'unknown': 'Unknown',
                'unranked': 'Unranked'
            },
            troopTypes: {
                infantry: 'Infantry',
                cavalry: 'Cavalry',
                archers: 'Archers',
                gathering: 'Gathering',
                support: 'Support',
                peacekeeping: 'Peacekeeping',
                leadership: 'Leadership',
                conquering: 'Conquering',
                skill: 'Skill',
                defense: 'Defense',
                attack: 'Attack',
                siege: 'Siege',
                training: 'Training',
            },
            details: 'Details',
            searchPlaceholder: 'Search for a commander...',
            noResults: 'No matching results found.',
            sortBy: 'Sort by:',
            builds: 'Best Builds:',
            pairings: 'Pairings:',
            primary: 'Primary',
            secondary: 'Secondary',
            role: 'Role',
            resourceBonus: 'Resource Bonus',
        }
    };
    
    // Centralized data for all commanders
    const allCommandersData = [
        { name: { ar: 'صلاح الدين الأيوبي', en: 'Saladin' }, specialties: ['cavalry', 'conquering', 'support'], bestUse: { ar: 'القتال المفتوح.', en: 'Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'حشد الفرسان', en: 'Cavalry Rally'}, talents: 'https://rok.guide/saladin-talent-tree-builds/'}, { name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/saladin-talent-tree-builds/' }], pairings: [{ primary: {ar: 'أتيلا', en: 'Attila'}, secondary: {ar: 'صلاح الدين', en: 'Saladin'} }] },
        { name: { ar: 'أتِّيلا', en: 'Attila' }, specialties: ['cavalry', 'conquering', 'attack'], bestUse: { ar: 'تجميع القوات، القتال المفتوح.', en: 'Rally, Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'حشد الفرسان', en: 'Cavalry Rally'}, talents: 'https://rok.guide/attila-talent-tree-builds/' }], pairings: [{ primary: {ar: 'أتيلا', en: 'Attila'}, secondary: {ar: 'صلاح الدين', en: 'Saladin'} }] },
        { name: { ar: 'زينوبيا', en: 'Zenobia' }, specialties: ['leadership', 'garrison', 'defense'], bestUse: { ar: 'دفاع المدينة.', en: 'City Defense.' }, tier: 'C', rarity: 'legendary', builds: [{ name: {ar: 'حامية المدينة', en: 'City Garrison'}, talents: 'https://rok.guide/zenobia-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'غوان يو', en: 'Guan Yu' }, specialties: ['infantry', 'conquering', 'skill'], bestUse: { ar: 'القتال المفتوح، تجميع القوات.', en: 'Open-field, Rally.' }, tier: 'B+', rarity: 'legendary', builds: [{ name: {ar: 'حشد المشاة', en: 'Infantry Rally'}, talents: 'https://rok.guide/guan-yu-talent-tree-builds/' }], pairings: [{ primary: {ar: 'غوان يو', en: 'Guan Yu'}, secondary: {ar: 'ألكسندر الأكبر', en: 'Alexander the Great'} }] },
        { name: { ar: 'ليونيداس الأول', en: 'Leonidas I' }, specialties: ['infantry', 'defense'], bestUse: { ar: 'القتال المفتوح، تجميع القوات.', en: 'Open-field, Rally.' }, tier: 'B', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/leonidas-i-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'ألكسندر نيفسكي', en: 'Alexander Nevsky' }, specialties: ['cavalry', 'attack'], bestUse: { ar: 'القتال المفتوح، تجميع القوات.', en: 'Open-field, Rally.' }, tier: 'A', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/alexander-nevsky-talent-tree-builds/' }], pairings: [{ primary: {ar: 'ألكسندر نيفسكي', en: 'Alexander Nevsky'}, secondary: {ar: 'يان زيجكا', en: 'Jan Zizka'} }] },
        { name: { ar: 'ليوش تشي', en: 'Liu Che' }, specialties: ['leadership', 'support'], bestUse: { ar: 'القتال المفتوح، تجميع القوات.', en: 'Open-field, Rally.' }, tier: 'S+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/liu-che-talent-tree-builds/' }], pairings: [{ primary: {ar: 'ليو تشي', en: 'Liu Che'}, secondary: {ar: 'ألكسندر الأكبر', en: 'Alexander the Great'} }] },
        { name: { ar: 'زوغ ليانغ', en: 'Zhuge Liang' }, specialties: ['archers', 'skill', 'defense'], bestUse: { ar: 'القتال المفتوح، غزو المدن.', en: 'Open-field, City Conquering.' }, tier: 'A+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/zhuge-liang-talent-tree-builds/' }], pairings: [{ primary: {ar: 'زوغ ليانغ', en: 'Zhuge Liang'}, secondary: {ar: 'هيرمان برايم', en: 'Hermann Prime'} }] },
        { name: { ar: 'مينا موتو يوشيتسون', en: 'Minamoto no Yoshitsune' }, specialties: ['cavalry', 'peacekeeping', 'skill'], bestUse: { ar: 'مهاجمة البرابرة، القتال المفتوح.', en: 'Barbarian Hunting, Open-field.' }, tier: 'A+', rarity: 'legendary', builds: [{ name: {ar: 'برابرة/وحوش', en: 'Barbarian/Monster Hunt'}, talents: 'https://rok.guide/minamoto-no-yoshitsune-talent-tree-builds/' }], pairings: [{ primary: {ar: 'مينا موتو', en: 'Minamoto'}, secondary: {ar: 'يى سيونغ-يى', en: 'YSG'} }] },
        { name: { ar: 'إيتيلفلد', en: 'Æthelflæd' }, specialties: ['leadership', 'peacekeeping', 'support'], bestUse: { ar: 'تجميع القوات، القتال المفتوح.', en: 'Rally, Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'دعم', en: 'Support'}, talents: 'https://rok.guide/aethelflaed-talent-tree-builds/' }], pairings: [{ primary: {ar: 'إيتيلفلد', en: 'Æthelflæd'}, secondary: {ar: 'ريتشارد الأول', en: 'Richard I'} }] },
        { name: { ar: 'سيما يي', en: 'Sima Yi' }, specialties: ['leadership', 'defense', 'attack'], bestUse: { ar: 'القتال المفتوح.', en: 'Open-field.' }, tier: 'Unknown', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'إيشيدا ميتسوناري', en: 'Ishida Mitsunari' }, specialties: ['gathering'], bestUse: { ar: 'جمع الطعام.', en: 'Gathering Food.' }, resource_bonus: { ar: 'الطعام +30%، الموارد الأخرى +20%', en: 'Food +30%, other resources +20%' }, tier: 'Unranked', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'سيوندوك', en: 'Seondeok' }, specialties: ['gathering'], bestUse: { ar: 'جمع الذهب.', en: 'Gathering Gold.' }, resource_bonus: { ar: 'الذهب +30%، الموارد الأخرى +20%', en: 'Gold +30%, other resources +20%' }, tier: 'Unranked', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'سكيبو برايم', en: 'Scipio Africanus (Prime)' }, specialties: ['infantry', 'leadership'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'A', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/scipio-africanus-prime-talent-tree-builds/' }], pairings: [{ primary: {ar: 'سكيبو برايم', en: 'Scipio Prime'}, secondary: {ar: 'ألكسندر الأكبر', en: 'Alexander the Great'} }] },
        { name: { ar: 'هيرمان برايم', en: 'Hermann (Prime)' }, specialties: ['archers', 'skill'], bestUse: { ar: 'ميدان مفتوح، حامية.', en: 'Open-field, Garrison.' }, tier: 'A', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/hermann-prime-talent-tree-builds/' }], pairings: [{ primary: {ar: 'هيرمان برايم', en: 'Hermann Prime'}, secondary: {ar: 'زوغ ليانغ', en: 'Zhuge Liang'} }] },
        { name: { ar: 'ويليام الأول', en: 'William I' }, specialties: ['cavalry', 'leadership'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'حشد الفرسان', en: 'Cavalry Rally'}, talents: 'https://rok.guide/william-i-talent-tree-builds/' }], pairings: [{ primary: {ar: 'ويليام الأول', en: 'William I'}, secondary: {ar: 'هيرمان برايم', en: 'Hermann Prime'} }] },
        { name: { ar: 'هو تشوبينج', en: 'Huo Qubing' }, specialties: ['cavalry', 'leadership'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'S', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/huo-qubing-talent-tree-builds/' }], pairings: [{ primary: {ar: 'هو تشوبينج', en: 'Huo Qubing'}, secondary: {ar: 'آرثر', en: 'Arthur'} }] },
        { name: { ar: 'نبوخذ نصر', en: 'Nebuchadnezzar II' }, specialties: ['archers', 'conquering'], bestUse: { ar: 'ميدان مفتوح، غزو.', en: 'Open-field, Conquering.' }, tier: 'B+', rarity: 'legendary', builds: [{ name: {ar: 'حشد الرماة', en: 'Archer Rally'}, talents: 'https://rok.guide/nebuchadnezzar-ii-talent-tree-builds/' }], pairings: [{ primary: {ar: 'نبوخذ نصر', en: 'Nebuchadnezzar'}, secondary: {ar: 'هيرمان برايم', en: 'Hermann Prime'} }] },
        { name: { ar: 'آرثر بن دراجون', en: 'Arthur Pendragon' }, specialties: ['cavalry', 'leadership'], bestUse: { ar: 'ميدان مفتوح.', en: 'Open-field.' }, tier: 'S+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/arthur-pendragon-talent-tree-builds/' }], pairings: [{ primary: {ar: 'آرثر', en: 'Arthur'}, secondary: {ar: 'هو تشوبينج', en: 'Huo Qubing'} }] },
        { name: { ar: 'تاكيدا شينجن', en: 'Takeda Shingen' }, specialties: ['cavalry', 'garrison'], bestUse: { ar: 'حشد، ميدان مفتوح.', en: 'Rally, Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'حشد الفرسان', en: 'Cavalry Rally'}, talents: 'https://rok.guide/takeda-shingen-talent-tree-builds/' }], pairings: [{ primary: {ar: 'أتيلا', en: 'Attila'}, secondary: {ar: 'تاكيدا شينجن', en: 'Takeda Shingen'} }] },
        { name: { ar: 'رمسيس الثاني', en: 'Ramesses II' }, specialties: ['archers', 'garrison'], bestUse: { ar: 'ميدان مفتوح، حامية.', en: 'Open-field, Garrison.' }, tier: 'C', rarity: 'legendary', builds: [{ name: {ar: 'حامية المدينة', en: 'City Garrison'}, talents: 'https://rok.guide/ramesses-ii-talent-tree-builds/' }], pairings: [{ primary: {ar: 'رمسيس الثاني', en: 'Ramesses II'}, secondary: {ar: 'يي سيونغ-يى', en: 'YSG'} }] },
        { name: { ar: 'توميريس', en: 'Tomyris' }, specialties: ['archers', 'skill'], bestUse: { ar: 'هجوم مستهدف، ميدان مفتوح.', en: 'Targeted Attack, Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/tomyris-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'إدوارد وودستوك', en: 'Edward of Woodstock' }, specialties: ['archers', 'skill'], bestUse: { ar: 'حشد، ميدان مفتوح.', en: 'Rally, Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'حشد الرماة', en: 'Archer Rally'}, talents: 'https://rok.guide/edward-of-woodstock-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'أرتميسيا الأولى', en: 'Artemisia I' }, specialties: ['archers', 'defense'], bestUse: { ar: 'دفاع المدينة، ميدان مفتوح.', en: 'City Defense, Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/artemisia-i-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'إل سيد', en: 'El Cid' }, specialties: ['archers', 'skill'], bestUse: { ar: 'ميدان مفتوح.', en: 'Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/el-cid-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'يي صن-سين', en: 'Yi Sun-sin' }, specialties: ['infantry', 'garrison'], bestUse: { ar: 'حامية.', en: 'Garrison.' }, tier: 'C', rarity: 'legendary', builds: [{ name: {ar: 'حامية المدينة', en: 'City Garrison'}, talents: 'https://rok.guide/yi-sun-sin-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'مولان', en: 'Mulan' }, specialties: ['support', 'leadership'], bestUse: { ar: 'دعم، ميدان مفتوح.', en: 'Support, Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'دعم', en: 'Support'}, talents: 'https://rok.guide/mulan-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'وو زيتيان', en: 'Wu Zetian' }, specialties: ['garrison', 'leadership'], bestUse: { ar: 'دفاع المدينة، حشد.', en: 'City Defense, Rally.' }, tier: 'C', rarity: 'legendary', builds: [{ name: {ar: 'حامية المدينة', en: 'City Garrison'}, talents: 'https://rok.guide/wu-zetian-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'شاندراغوبتا موريا', en: 'Chandragupta Maurya' }, specialties: ['infantry', 'skill'], bestUse: { ar: 'ميدان مفتوح.', en: 'Open-field.' }, tier: 'C', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/chandragupta-maurya-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'ويليام والاس', en: 'William Wallace' }, specialties: ['leadership', 'infantry'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'A+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/william-wallace-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'قسطنطين الأكبر', en: 'Constantine the Great' }, specialties: ['infantry', 'support'], bestUse: { ar: 'ميدان مفتوح، دعم.', en: 'Open-field, Support.' }, tier: 'C', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/constantine-the-great-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'باي تشي', en: 'Bai Qi' }, specialties: ['infantry', 'skill'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'S+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/bai-qi-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'راغنار لوثبروك', en: 'Ragnar Lodbrok' }, specialties: ['infantry', 'conquering'], bestUse: { ar: 'ميدان مفتوح.', en: 'Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/ragnar-lodbrok-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'شاهبور', en: 'Shapur' }, specialties: ['cavalry', 'gathering'], bestUse: { ar: 'جمع، ميدان مفتوح.', en: 'Gathering, Open-field.' }, tier: 'NEW', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'تشين شي هوانغ', en: 'Qin Shi Huang' }, specialties: ['archers', 'conquering'], bestUse: { ar: 'حشد، غزو.', en: 'Rally, Conquering.' }, tier: 'S+', rarity: 'legendary', builds: [{ name: {ar: 'حشد الرماة', en: 'Archer Rally'}, talents: 'https://rok.guide/qin-shi-huang-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'آشوربانيبال', en: 'Ashurbanipal' }, specialties: ['archers', 'garrison'], bestUse: { ar: 'حامية.', en: 'Garrison.' }, tier: 'B+', rarity: 'legendary', builds: [{ name: {ar: 'حامية المدينة', en: 'City Garrison'}, talents: 'https://rok.guide/ashurbanipal-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'غورغو', en: 'Gorgo' }, specialties: ['infantry', 'garrison'], bestUse: { ar: 'دفاع المدينة، حامية.', en: 'City Defense, Garrison.' }, tier: 'B+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/gorgo-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'سرجون الأكدي', en: 'Sargon of Akkad' }, specialties: ['leadership', 'infantry'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'B+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/sargon-of-akkad-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'غوان يو (برايم)', en: 'Guan Yu (Prime)' }, specialties: ['infantry', 'skill'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'B+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/guan-yu-prime-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'لابولابو', en: 'Lapulapu' }, specialties: ['infantry', 'defense'], bestUse: { ar: 'ميدان مفتوح، حامية.', en: 'Open-field, Garrison.' }, tier: 'B', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/lapulapu-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'هوندا تاداكاتسو', en: 'Honda Tadakatsu' }, specialties: ['infantry', 'skill'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/honda-tadakatsu-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'باكال الثاني', en: 'Pakal II' }, specialties: ['leadership', 'gathering'], bestUse: { ar: 'جمع، حشد.', en: 'Gathering, Rally.' }, tier: 'C+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'طارق بن زياد', en: 'Tariq ibn Ziyad' }, specialties: ['cavalry', 'conquering'], bestUse: { ar: 'حشد.', en: 'Rally.' }, tier: 'C+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'هارالد سيغوردسون', en: 'Harald Sigurdsson' }, specialties: ['infantry', 'skill'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/harald-sigurdsson-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'سوبوتاي', en: 'Subutai' }, specialties: ['cavalry', 'peacekeeping'], bestUse: { ar: 'ميدان مفتوح، برابرة.', en: 'Open-field, Barbarians.' }, tier: 'B+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/subutai-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'جون هونيادي', en: 'John Hunyadi' }, specialties: ['cavalry', 'leadership'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'B+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/john-hunyadi-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'ستيفن الثالث', en: 'Stephen III' }, specialties: ['infantry', 'leadership'], bestUse: { ar: 'ميدان مفتوح.', en: 'Open-field.' }, tier: 'B+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/stephen-iii-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'إليانور آكيتانيا', en: 'Eleanor of Aquitaine' }, specialties: ['archers', 'gathering'], bestUse: { ar: 'جمع.', en: 'Gathering.' }, tier: 'B', rarity: 'legendary', builds: [{ name: {ar: 'جمع الموارد', en: 'Resource Gathering'}, talents: 'https://rok.guide/eleanor-of-aquitaine-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'هنري الخامس', en: 'Henry V' }, specialties: ['archers', 'skill'], bestUse: { ar: 'ميدان مفتوح.', en: 'Open-field.' }, tier: 'B', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/henry-v-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'شيانغ يو', en: 'Xiang Yu' }, specialties: ['cavalry', 'skill'], bestUse: { ar: 'ميدان مفتوح.', en: 'Open-field.' }, tier: 'B', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/xiang-yu-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'غلجامش', en: 'Gilgamesh' }, specialties: ['leadership', 'infantry'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/gilgamesh-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'برتراند', en: 'Bertrand' }, specialties: ['cavalry', 'skill'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/bertrand-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'سايروس العظيم', en: 'Cyrus the Great' }, specialties: ['cavalry', 'leadership'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/cyrus-the-great-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'بيروس', en: 'Phyrrus' }, specialties: ['infantry', 'skill'], bestUse: { ar: 'ميدان مفتوح.', en: 'Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/phyrrus-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'غونزالو دي كوردوبا', en: 'Gonzalo de Cordoba' }, specialties: ['leadership', 'infantry'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'C+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'غاجاه مادا', en: 'Gajah Mada' }, specialties: ['support', 'garrison'], bestUse: { ar: 'حامية، دعم.', en: 'Garrison, Support.' }, tier: 'C+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'ديدو', en: 'Dido' }, specialties: ['infantry', 'garrison'], bestUse: { ar: 'دفاع المدينة، ميدان مفتوح.', en: 'City Defense, Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'مارغريت', en: 'Margaret' }, specialties: ['gathering', 'support'], bestUse: { ar: 'جمع، دعم.', en: 'Gathering, Support.' }, tier: 'C+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'بابور', en: 'Babur' }, specialties: ['cavalry', 'peacekeeping'], bestUse: { ar: 'ميدان مفتوح، برابرة.', en: 'Open-field, Barbarians.' }, tier: 'C+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'حنبعل برقة', en: 'Hannibal Barca' }, specialties: ['leadership', 'attack'], bestUse: { ar: 'ميدان مفتوح، غزو.', en: 'Open-field, Conquering.' }, tier: 'C+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'يان زيجكا', en: 'Jan Zizka' }, specialties: ['leadership', 'infantry'], bestUse: { ar: 'ميدان مفتوح.', en: 'Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'هرقليوس', en: 'Heraclius' }, specialties: ['leadership', 'support'], bestUse: { ar: 'ميدان مفتوح، دعم.', en: 'Open-field, Support.' }, tier: 'C+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'سليمان القانوني', en: 'Suleiman I' }, specialties: ['archers', 'conquering'], bestUse: { ar: 'حشد، غزو.', en: 'Rally, Conquering.' }, tier: 'C+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'جادويغا', en: 'Jadwiga' }, specialties: ['leadership', 'infantry'], bestUse: { ar: 'ميدان مفتوح.', en: 'Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'لو بو', en: 'Lu Bu' }, specialties: ['cavalry', 'skill'], bestUse: { ar: 'ميدان مفتوح.', en: 'Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'تراجان', en: 'Trajan' }, specialties: ['leadership', 'support'], bestUse: { ar: 'دعم، حشد.', en: 'Support, Rally.' }, tier: 'C', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'تشوك جون-غيونغ (CJ)', en: 'Cheok Jun-Gyeong (CJ)' }, specialties: ['infantry', 'leadership'], bestUse: { ar: 'ميدان مفتوح.', en: 'Open-field.' }, tier: 'C', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'تحتمس', en: 'Thutmose' }, specialties: ['archers', 'attack'], bestUse: { ar: 'ميدان مفتوح.', en: 'Open-field.' }, tier: 'C', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'موكتيزوما', en: 'Moctezuma' }, specialties: ['leadership', 'gathering'], bestUse: { ar: 'جمع، ميدان مفتوح.', en: 'Gathering, Open-field.' }, tier: 'C', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'ثيودورا', en: 'Theodora' }, specialties: ['leadership', 'garrison'], bestUse: { ar: 'حامية.', en: 'Garrison.' }, tier: 'C', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'فلافيوس', en: 'Flavius' }, specialties: ['infantry', 'conquering'], bestUse: { ar: 'حشد، ميدان مفتوح.', en: 'Rally, Open-field.' }, tier: 'C', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'شارلمان', en: 'Charlemagne' }, specialties: ['leadership', 'infantry'], bestUse: { ar: 'ميدان مفتوح, حشد.', en: 'Open-field, Rally.' }, tier: 'C', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'واك تشانيل أجا', en: 'Wak Chanil Ajaw' }, specialties: ['archers', 'conquering'], bestUse: { ar: 'حشد، غزو.', en: 'Rally, Conquering.' }, tier: 'Unranked', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'جستينيان الأول', en: 'Justinian I' }, specialties: ['infantry', 'defense'], bestUse: { ar: 'حامية، ميدان مفتوح.', en: 'Garrison, Open-field.' }, tier: 'B+', rarity: 'legendary', builds: [{ name: {ar: 'حامية المدينة', en: 'City Garrison'}, talents: 'https://rok.guide/justinian-i-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'شجر الدر', en: 'Shajar al-Durr' }, specialties: ['leadership', 'support'], bestUse: { ar: 'دعم، حامية.', en: 'Support, Garrison.' }, tier: 'A+', rarity: 'legendary', builds: [{ name: {ar: 'دعم', en: 'Support'}, talents: 'https://rok.guide/shajar-al-durr-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'توكوغاوا إياسو', en: 'Tokugawa Ieyasu' }, specialties: ['infantry', 'garrison'], bestUse: { ar: 'حامية.', en: 'Garrison.' }, tier: 'B+', rarity: 'legendary', builds: [{ name: {ar: 'حامية المدينة', en: 'City Garrison'}, talents: 'https://rok.guide/tokugawa-ieyasu-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'أتِّيلا (برايم)', en: 'Attila (Prime)' }, specialties: ['cavalry', 'conquering'], bestUse: { ar: 'تجميع القوات، القتال المفتوح.', en: 'Rally, Open-field.' }, tier: 'S+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'سكيبو ايميليانوس', en: 'Scipio Aemilianus' }, specialties: ['infantry', 'leadership'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'B+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'سياج كاك', en: 'Siyaj K\'ak' }, specialties: ['infantry', 'skill'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'B+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'ريتشارد الأول', en: 'Richard I' }, specialties: ['infantry', 'garrison', 'defense'], bestUse: { ar: 'دفاع المدينة، القتال المفتوح.', en: 'City Defense, Open-field.' }, tier: 'C', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/richard-i-talent-tree-builds/' }], pairings: [{ primary: {ar: 'ريتشارد الأول', en: 'Richard I'}, secondary: {ar: 'تشارلز مارتل', en: 'Charles Martel'} }] },
        { name: { ar: 'شارل مارتل', en: 'Charles Martel' }, specialties: ['infantry', 'garrison', 'defense'], bestUse: { ar: 'دفاع المدينة، القتال المفتوح.', en: 'City Defense, Open-field.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'حامية المدينة', en: 'City Garrison'}, talents: 'https://rok.guide/charles-martel-talent-tree-builds/' }], pairings: [{ primary: {ar: 'تشارلز مارتل', en: 'Charles Martel'}, secondary: {ar: 'ريتشارد الأول', en: 'Richard I'} }] },
        { name: { ar: 'يى سيونغ-يى (YSG)', en: 'Yi Seong-Gye (YSG)' }, specialties: ['archers', 'garrison', 'skill'], bestUse: { ar: 'القتال المفتوح، دفاع المدينة.', en: 'Open-field, City Defense.' }, tier: 'A+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/yi-seong-gye-talent-tree-builds/' }], pairings: [{ primary: {ar: 'يى سيونغ-يى', en: 'YSG'}, secondary: {ar: 'ألكسندر الأكبر', en: 'Alexander the Great'} }] },
        { name: { ar: 'جنكيز خان', en: 'Genghis Khan' }, specialties: ['cavalry', 'skill'], bestUse: { ar: 'القتال المفتوح، تجميع القوات.', en: 'Open-field, Rally.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'حشد الفرسان', en: 'Cavalry Rally'}, talents: 'https://rok.guide/genghis-khan-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'ألكسندر الأكبر', en: 'Alexander the Great' }, specialties: ['infantry', 'attack', 'defense'], bestUse: { ar: 'القتال المفتوح، دفاع المدينة.', en: 'Open-field, City Defense.' }, tier: 'A+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/alexander-the-great-talent-tree-builds/' }], pairings: [{ primary: {ar: 'ألكسندر الأكبر', en: 'Alexander the Great'}, secondary: {ar: 'ليوش تشي', en: 'Liu Che'} }] },
        { name: { ar: 'فريدريك الأول', en: 'Frederick I' }, specialties: ['conquering', 'skill'], bestUse: { ar: 'غزو المدن.', en: 'Conquering Cities.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'غزو المدن', en: 'City Conquering'}, talents: 'https://rok.guide/frederick-i-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'مهد الثاني', en: 'Mehmed II' }, specialties: ['leadership', 'conquering', 'skill'], bestUse: { ar: 'غزو المدن.', en: 'Conquering Cities.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'غزو المدن', en: 'City Conquering'}, talents: 'https://rok.guide/mehmed-ii-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'كاو كاو', en: 'Cao Cao' }, specialties: ['cavalry', 'peacekeeping'], bestUse: { ar: 'مهاجمة البرابرة، جمع الموارد.', en: 'Barbarian Hunting, Resource Gathering.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'البرابرة', en: 'Barbarians'}, talents: 'https://rok.guide/cao-cao-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'يوليوس قيصر', en: 'Julius Caesar' }, specialties: ['leadership', 'siege'], bestUse: { ar: 'القتال المفتوح، تجميع القوات.', en: 'Open-field, Rally.' }, tier: 'C+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/julius-caesar-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'كليوباترا السابعة', en: 'Cleopatra VII' }, specialties: ['gathering', 'support'], bestUse: { ar: 'جمع الموارد.', en: 'Resource Gathering.' }, resource_bonus: { ar: 'الحجر +30%، الموارد الأخرى +20%', en: 'Stone +30%, other resources +20%' }, tier: 'Unranked', rarity: 'legendary', builds: [{ name: {ar: 'جمع الموارد', en: 'Resource Gathering'}, talents: 'https://rok.guide/cleopatra-vii-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'رغنار (برايم)', en: 'Ragnar (Prime)' }, specialties: ['infantry', 'leadership'], bestUse: { ar: 'ميدان مفتوح، حشد.', en: 'Open-field, Rally.' }, tier: 'S+', rarity: 'legendary', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/ragnar-prime-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'أرشيميدس', en: 'Archimedes' }, specialties: ['leadership'], bestUse: { ar: 'دعم، قتال مفتوح.', en: 'Support, Open-field.' }, tier: 'NEW', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'ماري الأولى', en: 'Mary I' }, specialties: ['infantry', 'garrison'], bestUse: { ar: 'دفاع المدينة، قتال مفتوح.', en: 'City Defense, Open-field.' }, tier: 'NEW', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'تشوي يونغ', en: 'Choe Yeong' }, specialties: ['infantry', 'conquering'], bestUse: { ar: 'حشد، قتال مفتوح.', en: 'Rally, Open-field.' }, tier: 'B+', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'أمانيتور', en: 'Amanitore' }, specialties: ['archers', 'conquering'], bestUse: { ar: 'حشد، قتال مفتوح.', en: 'Rally, Open-field.' }, tier: 'C', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'تامر', en: 'Tamar' }, specialties: ['gathering'], bestUse: { ar: 'جمع الموارد.', en: 'Resource Gathering.' }, tier: 'Unranked', rarity: 'legendary', builds: [], pairings: [] },
        { name: { ar: 'إمحوتب', en: 'Imhotep' }, specialties: ['infantry', 'garrison'], bestUse: { ar: 'دفاع المدينة، ميدان مفتوح.', en: 'City Defense, Open-field.' }, tier: 'S', rarity: 'epic', builds: [], pairings: [] },
        { name: { ar: 'جان دارك', en: 'Joan of Arc' }, specialties: ['gathering', 'support'], bestUse: { ar: 'جمع الموارد، ساحة المعركة.', en: 'Resource Gathering, Open-field.' }, tier: 'S', rarity: 'epic', builds: [{ name: {ar: 'جمع الموارد', en: 'Resource Gathering'}, talents: 'https://rok.guide/joan-of-arc-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'سون تزو', en: 'Sun Tzu' }, specialties: ['infantry', 'skill', 'support'], bestUse: { ar: 'المعارك الجماعية، القتال المفتوح.', en: 'Group Battles, Open-field.' }, tier: 'S', rarity: 'epic', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/sun-tzu-talent-tree-builds/' }], pairings: [{ primary: {ar: 'سون تزو', en: 'Sun Tzu'}, secondary: {ar: 'يى سيونغ-يى', en: 'YSG'} }] },
        { name: { ar: 'بايبرس', en: 'Baibars' }, specialties: ['cavalry', 'conquering', 'skill'], bestUse: { ar: 'ساحة المعركة، مهاجمة المدن.', en: 'Open-field, City Assault.' }, tier: 'A+', rarity: 'epic', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/baibars-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'كاثرين دي ميديشي', en: 'Catherine de Medici' }, specialties: ['support', 'garrison'], bestUse: { ar: 'دعم، حامية.', en: 'Support, Garrison.' }, tier: 'A', rarity: 'epic', builds: [{ name: {ar: 'دعم', en: 'Support'}, talents: 'https://rok.guide/catherine-de-medici-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'بيورن ايرونسايد', en: 'Bjorn Ironside' }, specialties: ['infantry', 'skill'], bestUse: { ar: 'ميدان مفتوح.', en: 'Open-field.' }, tier: 'A', rarity: 'epic', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/bjorn-ironside-talent-tree-builds/' }], pairings: [{ primary: {ar: 'بيورن', en: 'Bjorn'}, secondary: {ar: 'سون تزو', en: 'Sun Tzu'} }] },
        { name: { ar: 'هيرمان', en: 'Hermann' }, specialties: ['archers', 'defense', 'attack'], bestUse: { ar: 'القتال المفتوح، دفاع المدينة.', en: 'Open-field, City Defense.' }, tier: 'A', rarity: 'epic', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/hermann-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'بيليساريوس', en: 'Belisarius' }, specialties: ['cavalry', 'conquering'], bestUse: { ar: 'ميدان مفتوح، برابرة.', en: 'Open-field, Barbarians.' }, tier: 'A', rarity: 'epic', builds: [{ name: {ar: 'البرابرة', en: 'Barbarians'}, talents: 'https://rok.guide/belisarius-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'كيرا', en: 'Keira' }, specialties: ['skill', 'peacekeeping'], bestUse: { ar: 'برابرة، ميدان مفتوح.', en: 'Barbarians, Open-field.' }, tier: 'A', rarity: 'epic', builds: [{ name: {ar: 'البرابرة', en: 'Barbarians'}, talents: 'https://rok.guide/keira-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'نارسيس', en: 'Narses' }, specialties: ['cavalry', 'conquering'], bestUse: { ar: 'حشد، ميدان مفتوح.', en: 'Rally, Open-field.' }, tier: 'B+', rarity: 'epic', builds: [], pairings: [] },
        { name: { ar: 'كوسونوكي ماساشيجي', en: 'Kusunoki Masashige' }, specialties: ['archers', 'garrison', 'skill'], bestUse: { ar: 'دفاع المدينة، ساحة المعركة.', en: 'City Defense, Open-field.' }, tier: 'B+', rarity: 'epic', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/kusunoki-masashige-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'بيريكليس', en: 'Pericles' }, specialties: ['infantry', 'leadership'], bestUse: { ar: 'ميدان مفتوح.', en: 'Open-field.' }, tier: 'B+', rarity: 'epic', builds: [], pairings: [] },
        { name: { ar: 'بيلاجيس', en: 'Pelagius' }, specialties: ['cavalry', 'garrison', 'skill'], bestUse: { ar: 'القتال المفتوح، الدفاع عن المدن.', en: 'Open-field, City Defense.' }, tier: 'B', rarity: 'epic', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/pelagius-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'يولجي مونديوك', en: 'Eulji Mundeok' }, specialties: ['infantry', 'conquering', 'defense'], bestUse: { ar: 'غزو المدن.', en: 'Conquering Cities.' }, tier: 'B', rarity: 'epic', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/eulji-mundeok-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'أوزمان الأول', en: 'Osman I' }, specialties: ['leadership', 'conquering', 'skill'], bestUse: { ar: 'غزو المدن.', en: 'Conquering Cities.' }, tier: 'B', rarity: 'epic', builds: [{ name: {ar: 'غزو المدن', en: 'City Conquering'}, talents: 'https://rok.guide/osman-i-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'سكيبو أفريكانوس', en: 'Scipio Africanus' }, specialties: ['leadership', 'siege'], bestUse: { ar: 'القتال المفتوح، تجميع القوات.', en: 'Open-field, Rally.' }, tier: 'C', rarity: 'epic', builds: [{ name: {ar: 'القتال المفتوح', en: 'Open Field'}, talents: 'https://rok.guide/scipio-africanus-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'بوديكا', en: 'Boudica' }, specialties: ['peacekeeping', 'skill'], bestUse: { ar: 'ميدان مفتوح، برابرة.', en: 'Open-field, Barbarians.' }, tier: 'C', rarity: 'epic', builds: [{ name: {ar: 'البرابرة', en: 'Barbarians'}, talents: 'https://rok.guide/boudica-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'دياوتشان', en: 'Diaochan' }, specialties: ['support', 'gathering'], bestUse: { ar: 'جمع، دعم.', en: 'Gathering, Support.' }, tier: 'C', rarity: 'epic', builds: [{ name: {ar: 'جمع الموارد', en: 'Resource Gathering'}, talents: 'https://rok.guide/diaochan-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'لوهار', en: 'Lohar' }, specialties: ['peacekeeping', 'support'], bestUse: { ar: 'برابرة، دعم.', en: 'Barbarians, Support.' }, tier: 'D', rarity: 'epic', builds: [{ name: {ar: 'البرابرة', en: 'Barbarians'}, talents: 'https://rok.guide/lohar-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'ماتيلدا', en: 'Matilda of Flanders' }, specialties: ['gathering'], bestUse: { ar: 'جمع الحجر.', en: 'Gathering Stone.' }, resource_bonus: { ar: 'الحجر +25%، الموارد الأخرى +20%', en: 'Stone +25%, other resources +20%' }, tier: 'Unranked', rarity: 'epic', builds: [{ name: {ar: 'جمع الموارد', en: 'Resource Gathering'}, talents: 'https://rok.guide/matilda-of-flanders-talent-tree-builds/' }], pairings: [] },
        { name: { ar: 'جان دارك (برايم)', en: 'Joan of Arc (Prime)' }, specialties: ['gathering', 'support'], bestUse: { ar: 'جمع الموارد، ساحة المعركة.', en: 'Resource Gathering, Open-field.' }, tier: 'A', rarity: 'epic', builds: [], pairings: [] },
        { name: { ar: 'بيليساريوس (برايم)', en: 'Belisarius (Prime)' }, specialties: ['cavalry', 'conquering'], bestUse: { ar: 'ميدان مفتوح، برابرة.', en: 'Open-field, Barbarians.' }, tier: 'B+', rarity: 'epic', builds: [], pairings: [] },
        { name: { ar: 'بوديكا (برايم)', en: 'Boudica (Prime)' }, specialties: ['peacekeeping', 'skill'], bestUse: { ar: 'ميدان مفتوح، برابرة.', en: 'Open-field, Barbarians.' }, tier: 'B+', rarity: 'epic', builds: [], pairings: [] },
        { name: { ar: 'لانسلوت', en: 'Lancelot' }, specialties: ['cavalry', 'gathering'], bestUse: { ar: 'جمع الموارد.', en: 'Resource Gathering.' }, tier: 'Unknown', rarity: 'elite', builds: [], pairings: [] },
        { name: { ar: 'توموي جوزين', en: 'Tomoe Gozen' }, specialties: ['leadership', 'support', 'attack'], bestUse: { ar: 'مهاجمة البرابرة.', en: 'Barbarian Hunting.' }, tier: 'Unknown', rarity: 'elite', builds: [], pairings: [] },
        { name: { ar: 'غايوس ماريوس', en: 'Gaius Marius' }, specialties: ['gathering', 'leadership'], bestUse: { ar: 'جمع الموارد.', en: 'Resource Gathering.' }, tier: 'Unknown', rarity: 'elite', builds: [], pairings: [] },
        { name: { ar: 'سينشريون', en: 'Centurion' }, specialties: ['leadership', 'training'], bestUse: { ar: 'تدريب القوات.', en: 'Troop Training.' }, tier: 'Unknown', rarity: 'elite', builds: [], pairings: [] },
        { name: { ar: 'كونستانس', en: 'Constance' }, specialties: ['gathering', 'support'], bestUse: { ar: 'جمع الموارد.', en: 'Resource Gathering.' }, tier: 'Unknown', rarity: 'advanced', builds: [], pairings: [] },
        { name: { ar: 'ساركا', en: 'Sarka' }, specialties: ['gathering', 'support'], bestUse: { ar: 'جمع الموارد.', en: 'Resource Gathering.' }, tier: 'Unknown', rarity: 'advanced', builds: [], pairings: [] }
    ];

    const civilizationsData = [
        { name: { ar: 'الصين', en: 'China' }, commander: { ar: 'صن تزو', en: 'Sun Tzu' }, unit: { ar: 'تشو-كو-نو (رماة)', en: 'Chu-Ko-Nu (Archers)' }, bonus: { ar: 'سرعة البناء +3%', en: 'Construction Speed +3%' } },
        { name: { ar: 'ألمانيا', en: 'Germany' }, commander: { ar: 'هيرمان', en: 'Hermann' }, unit: { ar: 'الفرسان التيوتونيين (فرسان)', en: 'Teutonic Knight (Cavalry)' }, bonus: { ar: 'سرعة تدريب +5%، هجوم الفرسان +5%', en: 'Troop Training Speed +5%, Cavalry Attack +5%' } },
        { name: { ar: 'روما', en: 'Rome' }, commander: { ar: 'سكيبو أفريكانوس', en: 'Scipio Africanus' }, unit: { ar: 'الليجيوناري (مشاة)', en: 'Legionary (Infantry)' }, bonus: { ar: 'دفاع المشاة +5%', en: 'Infantry Defense +5%' } },
        { name: { ar: 'بريطانيا', en: 'Britain' }, commander: { ar: 'بوديكا', en: 'Boudica' }, unit: { ar: 'رماة القوس الطويل (رماة)', en: 'Longbowman (Archers)' }, bonus: { ar: 'سرعة جمع الأخشاب +10%', en: 'Wood Gathering Speed +10%' } },
        { name: { ar: 'كوريا', en: 'Korea' }, commander: { ar: 'يولجي موندوك', en: 'Eulji Mundeok' }, unit: { ar: 'هوارانج (رماة)', en: 'Hwarang (Archers)' }, bonus: { ar: 'سعة المستشفى +15%', en: 'Hospital Capacity +15%' } },
        { name: { ar: 'فرنسا', en: 'France' }, commander: { ar: 'جان دارك', en: 'Joan of Arc' }, unit: { ar: 'رماة الفأس (مشاة)', en: 'Throwing Axeman (Infantry)' }, bonus: { ar: 'سرعة شفاء المستشفى +20%', en: 'Hospital Healing Speed +20%' } },
        { name: { ar: 'بيزنطة', en: 'Byzantium' }, commander: { ar: 'بيليساريوس', en: 'Belisarius' }, unit: { ar: 'الكاتافراكت (فرسان)', en: 'Cataphract (Cavalry)' }, bonus: { ar: 'قدرة حمل +15%', en: 'Troop Load +15%' } },
        { name: { ar: 'اليابان', en: 'Japan' }, commander: { ar: 'كوسونوكي ماساشيجي', en: 'Kusunoki Masashige' }, unit: { ar: 'الساموراي (مشاة)', en: 'Samurai (Infantry)' }, bonus: { ar: 'سرعة جمع الطعام +5%', en: 'Food Gathering Speed +5%' } },
        { name: { ar: 'العرب', en: 'Arabia' }, commander: { ar: 'بيبرس', en: 'Baibars' }, unit: { ar: 'المماليك (فرسان)', en: 'Mamluk (Cavalry)' }, bonus: { ar: 'هجوم الفرسان +5%', en: 'Cavalry Attack +5%' } },
        { name: { ar: 'العثمانية', en: 'Ottoman' }, commander: { ar: 'عثمان الأول', en: 'Osman I' }, unit: { ar: 'الإنكشارية (رماة)', en: 'Janissary (Archers)' }, bonus: { ar: 'هجوم الرماة +5%', en: 'Archer Attack +5%' } },
        { name: { ar: 'الفايكنج', en: 'Viking' }, commander: { ar: 'بيورن ايرونسايد', en: 'Björn Ironside' }, unit: { ar: 'المحارب الغاضب (مشاة)', en: 'Berserker (Infantry)' }, bonus: { ar: 'هجوم المشاة +5%', en: 'Infantry Attack +5%' } },
        { name: { ar: 'مصر', en: 'Egypt' }, commander: { ar: 'إمحوتب', en: 'Imhotep' }, unit: { ar: 'الماريانو (رماة)', en: 'Maryannu (Archers)' }, bonus: { ar: 'دفاع الرماة +5%', en: 'Archer Defense +5%' } },
        { name: { ar: 'إسبانيا', en: 'Spain' }, commander: { ar: 'بيلاجيوس', en: 'Pelagius' }, unit: { ar: 'الغازي (فرسان)', en: 'Conquistador (Cavalry)' }, bonus: { ar: 'قدرة حمل +10%', en: 'Troop Load +10%' } },
    ];

    const pairingsData = [
        {
            type: { ar: 'المشاة', en: 'Infantry' },
            pairs: [
                { primary: { ar: 'ليو تشي', en: 'Liu Che' }, secondary: { ar: 'ألكسندر، BQ، أي قائد آخر', en: 'Alexander, BQ, any other commander' }, role: { ar: 'ميدان مفتوح، حشد', en: 'Open-field, Rally' } },
                { primary: { ar: 'ألكسندر الأكبر', en: 'Alexander the Great' }, secondary: { ar: 'ليو تشي، يي سونغ غي', en: 'Liu Che, Yi Seong-Gye' }, role: { ar: 'ميدان مفتوح، حامية', en: 'Open-field, Garrison' } },
                { primary: { ar: 'ريتشارد الأول', en: 'Richard I' }, secondary: { ar: 'تشارلز مارتل، كونستانتين', en: 'Charles Martel, Constantine' }, role: { ar: 'ميدان مفتوح، تانك', en: 'Open-field, Tank' } },
                { primary: { ar: 'تشارلز مارتل', en: 'Charles Martel' }, secondary: { ar: 'ريتشارد، قسطنطين', en: 'Richard, Constantine' }, role: { ar: 'حامية، ميدان', en: 'Garrison, Open-field' } },
                { primary: { ar: 'غوان يو', en: 'Guan Yu' }, secondary: { ar: 'يي سونغ غي، ألكسندر', en: 'Yi Seong-Gye, Alexander' }, role: { ar: 'ميدان مفتوح، حشد', en: 'Open-field, Rally' } },
            ]
        },
        {
            type: { ar: 'الفرسان', en: 'Cavalry' },
            pairs: [
                { primary: { ar: 'هو تشوبينج', en: 'Huo Qubing' }, secondary: { ar: 'آرثر، ويليام', en: 'Arthur, William' }, role: { ar: 'ميدان مفتوح، حشد', en: 'Open-field, Rally' } },
                { primary: { ar: 'آرثر', en: 'Arthur' }, secondary: { ar: 'هو تشوبينج، فيليب', en: 'Huo Qubing, Philip' }, role: { ar: 'ميدان مفتوح', en: 'Open-field' } },
                { primary: { ar: 'أتيلا وتاكيدا', en: 'Attila & Takeda' }, secondary: { ar: 'ثنائي قوي لحشود المدن', en: 'Strong duo for city rallies' }, role: { ar: 'حشد', en: 'Rally' } },
            ]
        },
        {
            type: { ar: 'الرماة', en: 'Archers' },
            pairs: [
                { primary: { ar: 'يي سونغ غي', en: 'Yi Seong-Gye' }, secondary: { ar: 'ألكسندر، رمسيس، كوسونوكي', en: 'Alexander, Ramesses, Kusunoki' }, role: { ar: 'متعدد الاستخدامات', en: 'Versatile' } },
                { primary: { ar: 'ليانغ', en: 'Liang' }, secondary: { ar: 'هيرمان برايم', en: 'Hermann Prime' }, role: { ar: 'ميدان مفتوح', en: 'Open-field' } },
            ]
        },
        {
            type: { ar: 'متنوع', en: 'Miscellaneous' },
            pairs: [
                { primary: { ar: 'زينوبيا', en: 'Zenobia' }, secondary: { ar: 'مضادة لأتيلا وتاكيدا', en: 'Anti-Attila & Takeda' }, role: { ar: 'حامية', en: 'Garrison' } },
            ]
        }
    ];

    const fetchCommanderData = () => {
        return new Promise(resolve => {
            setTimeout(() => resolve(allCommandersData), 500);
        });
    };

    const fetchCivilizationData = () => {
        return new Promise(resolve => {
            setTimeout(() => resolve(civilizationsData), 500);
        });
    };

    const fetchPairingData = () => {
        return new Promise(resolve => {
            setTimeout(() => resolve(pairingsData), 500);
        });
    };
    
    let allCommanders = [];

    const renderCommanders = (filter, searchQuery = '', sortBy = 'name') => {
        const container = document.getElementById('commanders-container');
        const lang = document.documentElement.lang;
        container.innerHTML = `<div id="loading-spinner" class="col-span-full flex justify-center py-12"><div class="spinner h-16 w-16 border-4 border-gray-500 border-t-yellow-400 rounded-full"></div></div>`;
        
        fetchCommanderData().then(data => {
            const filteredCommanders = data.filter(commander => {
                const matchesFilter = filter === 'all' || commander.specialties.includes(filter);
                const matchesSearch = commander.name.en.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                        commander.name.ar.includes(searchQuery);
                return matchesFilter && matchesSearch;
            });

            let sortedCommanders = [];
            if (sortBy === 'name') {
                sortedCommanders = filteredCommanders.sort((a, b) => a.name[lang].localeCompare(b.name[lang]));
            } else if (sortBy === 'tier') {
                const tierOrder = ['S+', 'S', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'NEW', 'Unknown', 'Unranked'];
                sortedCommanders = filteredCommanders.sort((a, b) => {
                    const tierAIndex = tierOrder.indexOf(a.tier);
                    const tierBIndex = tierOrder.indexOf(b.tier);
                    return tierAIndex - tierBIndex;
                });
            }

            container.innerHTML = '';
            if (sortedCommanders.length === 0) {
                container.innerHTML = `<p class="col-span-full text-center text-gray-400">${translations[lang].noResults}</p>`;
            }

            sortedCommanders.forEach(commander => {
                const card = document.createElement('div');
                card.className = 'bg-gray-800 card rounded-xl p-6 shadow-lg animate-fade-in-up flex flex-col justify-between';
                
                const rarityText = translations[lang].rarity[commander.rarity] || commander.rarity;
                const rarityColor = commander.rarity === 'legendary' ? 'text-yellow-400' : (commander.rarity === 'epic' ? 'text-purple-400' : 'text-gray-400');

                const specialtiesText = commander.specialties.map(s => {
                    return translations[lang].troopTypes[s] || s;
                }).join(', ');
                
                const tierClass = `tier-${commander.tier.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
                const tierText = translations[lang].tierNames[commander.tier.toLowerCase()] || commander.tier;

                const content = `
                    <div class="flex-grow">
                        <div class="flex justify-between items-center mb-2">
                            <h3 class="text-xl font-bold ${rarityColor}">${commander.name[lang]}</h3>
                            <span class="tier-label ${tierClass}">${tierText}</span>
                        </div>
                        <p class="text-sm text-gray-400 mb-4">${rarityText}</p>
                        <p class="text-sm text-gray-300">
                            <span class="font-semibold text-yellow-200">${translations[lang].specialties}:</span>
                            ${specialtiesText}
                        </p>
                    </div>
                    <div class="mt-4">
                        <button class="show-details-btn bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-full w-full" data-commander-name="${commander.name.en}" aria-label="Show details for ${commander.name.en}">
                            ${translations[lang].details}
                        </button>
                    </div>
                `;
                card.innerHTML = content;
                container.appendChild(card);
            });

            // Add event listeners for the new buttons
            document.querySelectorAll('.show-details-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const commanderName = e.target.dataset.commanderName;
                    showCommanderDetails(commanderName);
                });
            });
        });
    };

    const showCommanderDetails = (commanderName) => {
        const commander = allCommanders.find(c => c.name.en === commanderName);
        if (!commander) return;

        const lang = document.documentElement.lang;
        const modal = document.getElementById('commander-modal');
        const nameEl = document.getElementById('modal-commander-name');
        const rarityEl = document.getElementById('modal-commander-rarity');
        const tierEl = document.getElementById('modal-commander-tier');
        const specialtiesEl = document.getElementById('modal-commander-specialties');
        const bestUseEl = document.getElementById('modal-commander-best-use');
        const bonusEl = document.getElementById('modal-commander-bonus');
        const buildsEl = document.getElementById('modal-commander-builds');

        const rarityText = translations[lang].rarity[commander.rarity] || commander.rarity;

        const specialtiesText = commander.specialties.map(s => {
            return translations[lang].troopTypes[s] || s;
        }).join(', ');
        
        const tierClass = `tier-${commander.tier.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        const tierText = translations[lang].tierNames[commander.tier.toLowerCase()] || commander.tier;

        nameEl.textContent = commander.name[lang];
        rarityEl.textContent = rarityText;
        tierEl.innerHTML = `<span class="tier-label ${tierClass}">${tierText}</span>`;
        specialtiesEl.innerHTML = `<span class="font-semibold text-yellow-200">${translations[lang].specialties}:</span> ${specialtiesText}`;
        bestUseEl.innerHTML = `<span class="font-semibold text-yellow-200">${translations[lang].bestUse}:</span> ${commander.bestUse[lang]}`;

        if (commander.resource_bonus) {
            bonusEl.innerHTML = `<span class="font-semibold text-yellow-200">${translations[lang].resourceBonus}:</span> ${commander.resource_bonus[lang]}`;
            bonusEl.style.display = 'block';
        } else {
            bonusEl.style.display = 'none';
        }

        if (commander.builds && commander.builds.length > 0) {
            let buildsHtml = `<h4 class="text-lg font-bold text-yellow-300 mt-4">${translations[lang].builds}</h4><ul class="list-disc list-inside space-y-1 mt-2 text-sm text-gray-400">`;
            commander.builds.forEach(build => {
                buildsHtml += `<li><a href="${build.talents}" target="_blank" class="text-yellow-400 hover:underline">${build.name[lang]}</a></li>`;
            });
            buildsHtml += `</ul>`;
            buildsEl.innerHTML = buildsHtml;
            buildsEl.style.display = 'block';
        } else {
            buildsEl.style.display = 'none';
        }

        modal.classList.remove('hidden', 'fade-out');
        modal.classList.add('flex', 'fade-in');
    };

    const findCommanderByName = (name) => {
        return allCommanders.find(c => c.name.en === name);
    };

    const closeModal = () => {
        const modal = document.getElementById('commander-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    };

    const renderCivilizations = () => {
        const container = document.getElementById('civilizations-container');
        container.innerHTML = '';
        const lang = document.documentElement.lang;

        fetchCivilizationData().then(data => {
            data.forEach(civ => {
                const card = document.createElement('div');
                card.className = 'card-bg rounded-xl p-6 shadow-lg';
                const content = `
                    <h3 class="text-xl font-bold text-yellow-400 mb-4">${civ.name[lang]}</h3>
                    <div class="space-y-2 text-sm text-gray-400">
                        <p><span class="font-semibold text-yellow-200">${translations[lang].startingCommander}:</span> ${civ.commander[lang]}</p>
                        <p><span class="font-semibold text-yellow-200">${translations[lang].uniqueUnit}:</span> ${civ.unit[lang]}</p>
                        <p><span class="font-semibold text-yellow-200">${translations[lang].bonus}:</span> ${civ.bonus[lang]}</p>
                    </div>
                `;
                card.innerHTML = content;
                container.appendChild(card);
            });
        });
    };

    const renderPairings = () => {
        const container = document.getElementById('pairings-container');
        container.innerHTML = '';
        const lang = document.documentElement.lang;

        fetchPairingData().then(data => {
            data.forEach(category => {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'mb-8';
                const categoryTitle = document.createElement('h3');
                categoryTitle.className = 'text-2xl font-semibold text-yellow-300 mb-4';
                categoryTitle.textContent = category.type[lang];
                categoryDiv.appendChild(categoryTitle);

                category.pairs.forEach(pair => {
                    const pairingCard = document.createElement('div');
                    pairingCard.className = 'card-bg rounded-xl p-6 shadow-lg mb-4';
                    const pairContent = `
                        <p class="text-lg font-bold text-yellow-200">${translations[lang].primary}: ${pair.primary[lang]} & ${translations[lang].secondary}: ${pair.secondary[lang]}</p>
                        <p class="text-sm text-gray-400 mt-2">${translations[lang].role}: ${pair.role[lang]}</p>
                    `;
                    pairingCard.innerHTML = pairContent;
                    categoryDiv.appendChild(pairingCard);
                });
                container.appendChild(categoryDiv);
            });
        });
    };

    const langToggle = document.getElementById('lang-toggle');
    const toggleLanguage = () => {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        document.documentElement.lang = newLang;
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        langToggle.textContent = newLang.toUpperCase();
        
        document.querySelectorAll('[data-lang-ar]').forEach(el => {
            if (el.dataset.langEn && el.dataset.langAr) {
                el.textContent = newLang === 'ar' ? el.dataset.langAr : el.dataset.langEn;
            }
        });

        document.getElementById('commander-search').placeholder = translations[newLang].searchPlaceholder;
        document.getElementById('sort-by').querySelectorAll('option').forEach(option => {
            const val = option.value;
            option.textContent = translations[newLang][val];
        });

        const activeFilter = document.querySelector('.btn-filter.active').dataset.filter;
        const sortBy = document.getElementById('sort-by').value;
        renderCommanders(activeFilter, document.getElementById('commander-search').value, sortBy);
        renderCivilizations();
        renderPairings();
    };
    langToggle.addEventListener('click', toggleLanguage);

    const filterButtons = document.querySelectorAll('.btn-filter');
    const searchBar = document.getElementById('commander-search');
    const sortBySelect = document.getElementById('sort-by');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderCommanders(button.dataset.filter, searchBar.value, sortBySelect.value);
        });
    });

    searchBar.addEventListener('input', (e) => {
        const activeFilter = document.querySelector('.btn-filter.active').dataset.filter;
        renderCommanders(activeFilter, e.target.value, sortBySelect.value);
    });

    sortBySelect.addEventListener('change', (e) => {
        const activeFilter = document.querySelector('.btn-filter.active').dataset.filter;
        renderCommanders(activeFilter, searchBar.value, e.target.value);
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    document.getElementById('close-modal-btn').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target.id === 'commander-modal') {
            closeModal();
        }
    });
    
    // Initial data fetch and render
    fetchCommanderData().then(data => {
        allCommanders = data;
        renderCommanders('all');
    });
    renderCivilizations();
    renderPairings();
});
