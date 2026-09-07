import { useEffect, useState } from "react";
import type { Answers } from "../data/questions";
import { supabase } from "../lib/supabase";
import type { BreakdownItem } from "../lib/types";
import { ScoreBreakdownChart } from "./ScoreBreakdownChart";

interface Props {
  baseAnswers: Answers;
  baseScore: number;
}

interface SimResult {
  score: number;
  scoreBand: string;
  breakdown: BreakdownItem[];
  capacidadMensual: number;
  capacidadMaxima: number;
}

const currency = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const BAND_LABEL: Record<string, string> = {
  excelente: "Excelente",
  bueno: "Bueno",
  regular: "Regular",
  bajo: "Bajo",
};

export function WhatIfSimulator({ baseAnswers, baseScore }: Props) {
  const [ingresoMensual, setIngresoMensual] = useState(
    Number(baseAnswers.ingreso_mensual) || 0,
  );
  const [viviendaPropiedad, setViviendaPropiedad] = useState(
    String(baseAnswers.tienes_vivienda_en_propiedad ?? "no"),
  );
  const [otrosCreditos, setOtrosCreditos] = useState(
    String(baseAnswers.tienes_otros_creditos ?? "no"),
  );
  const [importeDeuda, setImporteDeuda] = useState(
    Number(baseAnswers.importe_total_de_la_deuda) || 0,
  );

  const [sim, setSim] = useState<SimResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(async () => {
      const answers: Answers = {
        ...baseAnswers,
        ingreso_mensual: ingresoMensual,
        tienes_vivienda_en_propiedad: viviendaPropiedad,
        tienes_otros_creditos: otrosCreditos,
      };
      if (otrosCreditos === "si") {
        answers.importe_total_de_la_deuda = importeDeuda;
      } else {
        delete answers.importe_total_de_la_deuda;
      }

      const { data, error } = await supabase
        .rpc("calculate_score", { p_answers: answers })
        .single<{
          score: number;
          score_band: string;
          breakdown: BreakdownItem[];
          capacidad_mensual: number;
          capacidad_maxima: number;
        }>();

      if (!error && data) {
        setSim({
          score: data.score,
          scoreBand: data.score_band,
          breakdown: data.breakdown,
          capacidadMensual: data.capacidad_mensual,
          capacidadMaxima: data.capacidad_maxima,
        });
      }
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [ingresoMensual, viviendaPropiedad, otrosCreditos, importeDeuda]);

  const handleReset = () => {
    setIngresoMensual(Number(baseAnswers.ingreso_mensual) || 0);
    setViviendaPropiedad(String(baseAnswers.tienes_vivienda_en_propiedad ?? "no"));
    setOtrosCreditos(String(baseAnswers.tienes_otros_creditos ?? "no"));
    setImporteDeuda(Number(baseAnswers.importe_total_de_la_deuda) || 0);
  };

  const delta = sim ? sim.score - baseScore : 0;

  return (
    <div className="whatif-section">
      <p className="breakdown-title">¿Y si cambia tu situación?</p>
      <p className="whatif-sub">
        Mueve estos valores para ver, al instante, cómo cambiaría tu puntuación.
      </p>

      <div className="whatif-controls">
        <div className="whatif-control">
          <div className="whatif-control-label">
            <span>Ingreso mensual</span>
            <span className="whatif-control-value">{currency.format(ingresoMensual)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={5000}
            step={50}
            value={ingresoMensual}
            onChange={(e) => setIngresoMensual(Number(e.target.value))}
          />
        </div>

        <div className="whatif-control">
          <div className="whatif-control-label">
            <span>Vivienda en propiedad</span>
          </div>
          <div className="whatif-toggle">
            <button
              className={viviendaPropiedad === "si" ? "active" : ""}
              onClick={() => setViviendaPropiedad("si")}
            >
              Sí
            </button>
            <button
              className={viviendaPropiedad === "no" ? "active" : ""}
              onClick={() => setViviendaPropiedad("no")}
            >
              No
            </button>
          </div>
        </div>

        <div className="whatif-control">
          <div className="whatif-control-label">
            <span>Otras deudas</span>
          </div>
          <div className="whatif-toggle">
            <button
              className={otrosCreditos === "si" ? "active" : ""}
              onClick={() => setOtrosCreditos("si")}
            >
              Sí
            </button>
            <button
              className={otrosCreditos === "no" ? "active" : ""}
              onClick={() => setOtrosCreditos("no")}
            >
              No
            </button>
          </div>
        </div>

        {otrosCreditos === "si" && (
          <div className="whatif-control">
            <div className="whatif-control-label">
              <span>Importe total de la deuda</span>
              <span className="whatif-control-value">{currency.format(importeDeuda)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={30000}
              step={500}
              value={importeDeuda}
              onChange={(e) => setImporteDeuda(Number(e.target.value))}
            />
          </div>
        )}
      </div>

      <button className="btn-link whatif-reset" onClick={handleReset}>
        Restablecer a mis respuestas
      </button>

      <div className={`whatif-result ${loading ? "loading" : ""}`}>
        {sim && (
          <>
            <div className="whatif-result-header">
              <div>
                <span className="whatif-score">{sim.score}</span>
                <span className={`whatif-delta ${delta >= 0 ? "positive" : "negative"}`}>
                  {delta >= 0 ? "+" : ""}
                  {delta}
                </span>
              </div>
              <span className="whatif-band">{BAND_LABEL[sim.scoreBand] ?? sim.scoreBand}</span>
            </div>
            <div className="capacity-grid whatif-capacity">
              <div className="capacity-stat">
                <span className="capacity-value">{currency.format(sim.capacidadMensual)}</span>
                <span className="capacity-label">Cuota mensual estimada</span>
              </div>
              <div className="capacity-stat">
                <span className="capacity-value">{currency.format(sim.capacidadMaxima)}</span>
                <span className="capacity-label">Importe máximo estimado</span>
              </div>
            </div>
            <ScoreBreakdownChart breakdown={sim.breakdown} />
          </>
        )}
      </div>
    </div>
  );
}
