-- Tabla de favoritos de recursos (corregido - recurso_id como bigint)
CREATE TABLE favoritos (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recurso_id BIGINT REFERENCES recursos(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, recurso_id)
);

-- Tabla de reportes de recursos
CREATE TABLE reportes (
  id SERIAL PRIMARY KEY,
  recurso_id BIGINT REFERENCES recursos(id) ON DELETE CASCADE,
  motivo TEXT NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de favoritos de cursos
CREATE TABLE cursos_favoritos (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  curso_id BIGINT REFERENCES cursos(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, curso_id)
);

-- Tabla de videos
CREATE TABLE IF NOT EXISTS videos (
  id BIGSERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  url TEXT NOT NULL,
  thumbnail TEXT,
  canal TEXT,
  duracion TEXT,
  nivel TEXT DEFAULT 'Variado',
  categorias TEXT[] DEFAULT '{}',
  aprobado BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  autor_nombre TEXT
);

-- Tabla de favoritos de videos
CREATE TABLE IF NOT EXISTS videos_favoritos (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  video_id BIGINT REFERENCES videos(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, video_id)
);

-- Habilitar RLS
ALTER TABLE favoritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE reportes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cursos_favoritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos_favoritos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "users own favorites" ON favoritos FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "users own courses favorites" ON cursos_favoritos FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "anyone can report" ON reportes FOR INSERT WITH CHECK (true);
CREATE POLICY "videos approved" ON videos FOR SELECT USING (aprobado = true);
CREATE POLICY "anyone can insert videos" ON videos FOR INSERT WITH CHECK (true);
CREATE POLICY "users own videos favorites" ON videos_favoritos FOR ALL USING (auth.uid() = user_id);