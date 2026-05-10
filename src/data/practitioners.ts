export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface Practitioner {
  id: string
  name: string
  handle: string
  tagline: string
  services: string[]
  workingDays: DayOfWeek[]
  accent: 'rose' | 'peach' | 'blush'
}

export const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: 'Lundi',
  tuesday: 'Mardi',
  wednesday: 'Mercredi',
  thursday: 'Jeudi',
  friday: 'Vendredi',
  saturday: 'Samedi',
  sunday: 'Dimanche',
}

export const practitioners: Practitioner[] = [
  {
    id: 'elsa',
    name: 'Elsa',
    handle: 'elsaanails',
    tagline: 'Soins des mains & des pieds',
    services: ['Manucure', 'Pédicure', 'Pose vernis / gel'],
    workingDays: ['saturday', 'sunday'],
    accent: 'rose',
  },
  {
    id: 'liza',
    name: 'Liza',
    handle: 'la_.beautyroom',
    tagline: 'Ongles & extensions',
    services: [
      'Manucure & pédicure',
      'Extensions de cils (bientôt)',
      'Extensions capillaires (ruban adhésif ou kératine)',
    ],
    workingDays: [
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ],
    accent: 'peach',
  },
  {
    id: 'mimi',
    name: 'Mimi',
    handle: 'MimiPediBrows',
    tagline: 'Sourcils, pieds & épilation',
    services: [
      'Microblading & microshading',
      'Pédicure & soins des pieds',
      'Épilation',
    ],
    workingDays: [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ],
    accent: 'blush',
  },
]

export function dayOfWeekFromDate(d: Date): DayOfWeek {
  const map: DayOfWeek[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]
  return map[d.getDay()]
}
