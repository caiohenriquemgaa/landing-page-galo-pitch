export type ImageRequirement = {
  width: number
  height: number
  label: string
  notes?: string
}

const imageRequirementMap: Record<string, ImageRequirement> = {
  "hero.backgroundImage": {
    width: 1920,
    height: 1080,
    label: "Hero / capa principal",
    notes: "Formato horizontal 16:9 para fundo da primeira dobra.",
  },
  "alex_santos.photo": {
    width: 800,
    height: 1000,
    label: "Foto do Alex Santos",
    notes: "Retrato vertical 4:5, com rosto centralizado.",
  },
  "structure.items.*.image": {
    width: 1600,
    height: 900,
    label: "Infraestrutura",
    notes: "Imagem horizontal 16:9 para cards e blocos institucionais.",
  },
  "youth_development.image": {
    width: 1600,
    height: 900,
    label: "Centro de formação",
    notes: "Imagem horizontal 16:9 para manter o enquadramento da seção.",
  },
}

function normalizePath(path: (string | number)[]) {
  return path.map((segment) => (typeof segment === "number" ? "*" : segment)).join(".")
}

export function getImageRequirement(path: (string | number)[]) {
  return imageRequirementMap[normalizePath(path)] ?? null
}
