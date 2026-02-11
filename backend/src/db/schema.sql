CREATE TABLE IF NOT EXISTS usage_events (
  id BIGSERIAL PRIMARY KEY,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  user_id TEXT NOT NULL,
  feature_tag TEXT NOT NULL,
  input_tokens INT NOT NULL CHECK (input_tokens >= 0),
  output_tokens INT NOT NULL CHECK (output_tokens >= 0),
  total_cost_usd NUMERIC(14, 6) NOT NULL,
  token_efficiency_score NUMERIC(10, 4) NOT NULL,
  request_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_usage_events_created_at ON usage_events(created_at);
CREATE INDEX IF NOT EXISTS idx_usage_events_feature_tag ON usage_events(feature_tag);
CREATE INDEX IF NOT EXISTS idx_usage_events_user_id ON usage_events(user_id);

CREATE TABLE IF NOT EXISTS alerts (
  id BIGSERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'critical')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
