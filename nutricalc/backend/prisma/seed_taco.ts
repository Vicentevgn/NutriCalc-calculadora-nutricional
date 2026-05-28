import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

async function main() {
  const alimentosPath = path.resolve(__dirname, '../data/taco_alimentos.csv');
  const acidosGraxosPath = path.resolve(__dirname, '../data/taco_acidos_graxos.csv');

  const alimentosContent = fs.readFileSync(alimentosPath, 'utf-8');
  const acidosGraxosContent = fs.readFileSync(acidosGraxosPath, 'utf-8');

  const alimentosData = parse(alimentosContent, {
    columns: true,
    skip_empty_lines: true,
  });

  const acidosGraxosData = parse(acidosGraxosContent, {
    columns: true,
    skip_empty_lines: true,
  });

  // Criar um mapa de ácidos graxos para busca rápida por ID (Número do Alimento)
  const acidosGraxosMap = new Map();
  acidosGraxosData.forEach((item: any) => {
    acidosGraxosMap.set(item['Número do Alimento'], item);
  });

  console.log('Iniciando importação de dados da TACO...');

  for (const row of alimentosData as any[]) {
    const foodId = row['Número do Alimento'];
    const acidos = acidosGraxosMap.get(foodId) || {};

    const cleanVal = (val: any) => {
      const v = parseFloat(val);
      return isNaN(v) ? 0 : v;
    };

    await prisma.ingredient.upsert({
      where: { name: row['Descrição dos alimentos'] },
      update: {},
      create: {
        name: row['Descrição dos alimentos'],
        calories: cleanVal(row['Energia..kcal.']),
        carbohydrates: cleanVal(row['Carboidrato..g.']),
        proteins: cleanVal(row['Proteína..g.']),
        totalFats: cleanVal(row['Lipídeos..g.']),
        saturatedFats: cleanVal(acidos['Saturados..g.']),
        totalSugars: 0, // TACO não fornece açúcares totais de forma separada em todos os itens
        addedSugars: 0, // Açúcares adicionados são específicos da receita final
        fiber: cleanVal(row['Fibra.Alimentar..g.']),
        sodium: cleanVal(row['Sódio..mg.']),
      },
    });
  }

  console.log('Importação concluída com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
