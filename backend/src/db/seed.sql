INSERT INTO usage_events (
  provider, model, user_id, feature_tag, input_tokens, output_tokens,
  total_cost_usd, token_efficiency_score, request_id, created_at
) VALUES
('openai', 'gpt-4o', 'user_001', 'onboarding_chat', 1200, 800, 0.018, 0.6667, 'req_1', NOW() - INTERVAL '10 days'),
('anthropic', 'claude-3-5-sonnet', 'user_002', 'summary_generator', 900, 1500, 0.0252, 1.6667, 'req_2', NOW() - INTERVAL '8 days'),
('openai', 'gpt-4o', 'user_003', 'support_bot', 400, 120, 0.0038, 0.3, 'req_3', NOW() - INTERVAL '2 days');

INSERT INTO alerts (message, severity)
VALUES
('Cost spike in summary_generator feature', 'warning'),
('Token efficiency dropped below target for support_bot', 'info');
