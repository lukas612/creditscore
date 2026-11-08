-- Avisos por email: pg_cron llama a diario a la edge function msi-reminders.
-- El service_role key va en Vault (nunca en texto plano en esta migración ni
-- en el historial de cron.job) - hay que crearlo una vez a mano:
--   select vault.create_secret('<service_role key>', 'project_service_role_key');
-- (Database > Vault en el dashboard de Supabase, o vault.create_secret por SQL)

create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

select cron.schedule(
  'msi-reminders-diario',
  '0 14 * * *', -- 14:00 UTC ~ 8:00 CDMX (ajustar si cambia el horario de verano)
  $$
  select net.http_post(
    url := 'https://ogwqeamrlsttufemserw.supabase.co/functions/v1/msi-reminders',
    headers := jsonb_build_object(
      'Authorization',
      'Bearer ' || (select decrypted_secret from vault.decrypted_secrets where name = 'project_service_role_key'),
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb
  );
  $$
);
