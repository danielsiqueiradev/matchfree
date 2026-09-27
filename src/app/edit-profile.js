import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIELD_OPTIONS, MAX_PROFILE_PHOTOS } from '../data/mock';
import { useApp } from '../store/AppContext';
import { moderatePhoto } from '../utils/photoGuard';
import { light, radius, spacing } from '../theme';

// ---------- Componentes base do formulário ----------

function Section({ icon, title, subtitle, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <View style={styles.section}>
      <Pressable style={styles.sectionHeader} onPress={() => setOpen(!open)}>
        <Text style={styles.sectionIcon}>{icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {!!subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
        </View>
        <Text style={styles.sectionChevron}>{open ? '▲' : '▼'}</Text>
      </Pressable>
      {open && <View style={styles.sectionBody}>{children}</View>}
    </View>
  );
}

function Field({ label, value, onChangeText, multiline = false, placeholder, keyboardType }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        value={value === undefined || value === null ? '' : String(value)}
        onChangeText={onChangeText}
        multiline={multiline}
        placeholder={placeholder}
        placeholderTextColor={light.textMuted}
        keyboardType={keyboardType}
      />
    </View>
  );
}

function Select({ label, value, options, onSelect }) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.select} onPress={() => setOpen(!open)}>
        <Text style={[styles.selectValue, !value && { color: light.textMuted }]}>
          {value || 'Selecionar'}
        </Text>
        <Text style={styles.selectChevron}>{open ? '▲' : '▼'}</Text>
      </Pressable>
      {open && (
        <View style={styles.optionsList}>
          {options.map((opt) => (
            <Pressable
              key={opt}
              style={[styles.option, opt === value && styles.optionActive]}
              onPress={() => {
                onSelect(opt);
                setOpen(false);
              }}
            >
              <Text style={[styles.optionText, opt === value && styles.optionTextActive]}>
                {opt}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

function Stepper({ label, value, suffix, onChange, min, max, step = 1 }) {
  return (
    <View style={styles.stepper}>
      <Text style={styles.stepperLabel}>{label}</Text>
      <View style={styles.stepperControls}>
        <Pressable style={styles.stepBtn} onPress={() => onChange(Math.max(min, value - step))}>
          <Text style={styles.stepBtnText}>−</Text>
        </Pressable>
        <Text style={styles.stepperValue}>
          {value}
          {suffix}
        </Text>
        <Pressable style={styles.stepBtn} onPress={() => onChange(Math.min(max, value + step))}>
          <Text style={styles.stepBtnText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ---------- Seções do formulário ----------

const notify = (title, message) => {
  if (Platform.OS === 'web') window.alert(`${title}\n\n${message}`);
  else Alert.alert(title, message);
};

async function pickFromLibrary() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 0.7,
    base64: true,
  });
  if (result.canceled || !result.assets || !result.assets[0]) return null;
  const asset = result.assets[0];
  return {
    uri: asset.base64
      ? `data:${asset.mimeType || 'image/jpeg'};base64,${asset.base64}`
      : asset.uri,
    fileName: asset.fileName || asset.uri || '',
  };
}

function PhotosSection({ app }) {
  const [photo, setPhoto] = useState(app.user.photo);
  const [cover, setCover] = useState(app.user.coverPhoto || '');
  const [newPhoto, setNewPhoto] = useState('');
  const [checking, setChecking] = useState(false);
  const photos = app.user.photos || [];

  const addPhoto = () => {
    const url = newPhoto.trim();
    if (!url || photos.length >= MAX_PROFILE_PHOTOS) return;
    app.updateUser({ photos: [...photos, url] });
    setNewPhoto('');
  };

  const upload = async (apply) => {
    setChecking(true);
    try {
      const picked = await pickFromLibrary();
      if (!picked) return;
      const verdict = await moderatePhoto(picked.uri, picked.fileName);
      if (!verdict.ok) {
        notify('Moderação de fotos', verdict.reason);
        return;
      }
      apply(picked.uri);
    } finally {
      setChecking(false);
    }
  };

  return (
    <Section icon="📸" title="Fotos" subtitle={`${photos.length}/${MAX_PROFILE_PHOTOS} fotos`} defaultOpen>
      <Field
        label="Foto principal (URL)"
        value={photo}
        onChangeText={setPhoto}
        placeholder="https://..."
      />
      <View style={styles.photoBtns}>
        <Pressable style={styles.inlineSave} onPress={() => app.updateUser({ photo })}>
          <Text style={styles.inlineSaveText}>Salvar foto principal</Text>
        </Pressable>
        <Pressable
          style={styles.uploadBtn}
          onPress={() => upload((uri) => { setPhoto(uri); app.updateUser({ photo: uri }); })}
        >
          <Text style={styles.inlineSaveText}>📷 Enviar do dispositivo</Text>
        </Pressable>
      </View>

      <Field
        label="Foto de capa (URL)"
        value={cover}
        onChangeText={setCover}
        placeholder="https://..."
      />
      <View style={styles.photoBtns}>
        <Pressable style={styles.inlineSave} onPress={() => app.updateUser({ coverPhoto: cover })}>
          <Text style={styles.inlineSaveText}>Salvar capa</Text>
        </Pressable>
        <Pressable
          style={styles.uploadBtn}
          onPress={() => upload((uri) => { setCover(uri); app.updateUser({ coverPhoto: uri }); })}
        >
          <Text style={styles.inlineSaveText}>🖼️ Enviar capa</Text>
        </Pressable>
      </View>
      {!!app.user.coverPhoto && (
        <Image source={{ uri: app.user.coverPhoto }} style={styles.coverPreview} />
      )}

      <Text style={[styles.label, { marginTop: spacing(2) }]}>Fotos do perfil</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoRow}>
        {photos.map((uri, index) => (
          <View key={`${uri}-${index}`} style={styles.photoItem}>
            <Image source={{ uri }} style={styles.photoThumb} />
            <Pressable
              style={styles.photoRemove}
              onPress={() =>
                app.updateUser({ photos: photos.filter((_, i) => i !== index) })
              }
            >
              <Text style={styles.photoRemoveText}>✕</Text>
            </Pressable>
          </View>
        ))}
        {photos.length === 0 && (
          <Text style={styles.photoEmpty}>Nenhuma foto adicional ainda.</Text>
        )}
      </ScrollView>
      {photos.length < MAX_PROFILE_PHOTOS ? (
        <View style={{ flexDirection: 'row', gap: spacing(1) }}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={newPhoto}
            onChangeText={setNewPhoto}
            autoCapitalize="none"
            placeholder="URL da nova foto"
            placeholderTextColor={light.textMuted}
          />
          <Pressable style={styles.smallBtn} onPress={addPhoto}>
            <Text style={styles.smallBtnText}>+ URL</Text>
          </Pressable>
          <Pressable
            style={styles.smallBtn}
            onPress={() =>
              photos.length < MAX_PROFILE_PHOTOS &&
              upload((uri) => app.updateUser({ photos: [...photos, uri] }))
            }
          >
            <Text style={styles.smallBtnText}>📷 Upload</Text>
          </Pressable>
        </View>
      ) : (
        <Text style={styles.warn}>Limite de {MAX_PROFILE_PHOTOS} fotos atingido.</Text>
      )}
      {checking && <Text style={styles.moderation}>🔎 Moderando a foto escolhida...</Text>}
    </Section>
  );
}

function BioSection({ app }) {
  return (
    <Section icon="📝" title="Biografia" defaultOpen>
      <Field
        label="Bio"
        value={app.user.bio}
        onChangeText={(bio) => app.updateUser({ bio })}
        multiline
        placeholder="Fale um pouco sobre você e sua fé..."
      />
    </Section>
  );
}

function ReligionSection({ app }) {
  const u = app.user;
  return (
    <Section icon="⛪" title="Religião" subtitle={u.church}>
      <Field
        label="Igreja / Denominação"
        value={u.church}
        onChangeText={(church) => app.updateUser({ church })}
        placeholder="Ex.: Assembleia de Deus"
      />
      <Field
        label="Atividades na Igreja"
        value={u.churchActivities}
        onChangeText={(churchActivities) => app.updateUser({ churchActivities })}
        placeholder="Ex.: Louvor, EBD, Missões"
      />
      <Select
        label="Frequência que vai à Igreja"
        value={u.churchFrequency}
        options={FIELD_OPTIONS.churchFrequency}
        onSelect={(churchFrequency) => app.updateUser({ churchFrequency })}
      />
      <Field
        label="Versículo favorito"
        value={u.verse}
        onChangeText={(verse) => app.updateUser({ verse })}
        placeholder="Ex.: Provérbios 3:5-6"
      />
      <Field
        label="Ministério"
        value={u.ministry}
        onChangeText={(ministry) => app.updateUser({ ministry })}
        placeholder="Ex.: Louvor, Kids, Missões"
      />
    </Section>
  );
}

function GeneralDataSection({ app }) {
  const u = app.user;
  return (
    <Section icon="👤" title="Dados Gerais" subtitle={u.location}>
      <Field
        label="Nome"
        value={u.name}
        onChangeText={(name) => app.updateUser({ name })}
      />
      <Stepper
        label="Idade"
        value={u.age}
        suffix=" anos"
        min={18}
        max={80}
        onChange={(age) => app.updateUser({ age })}
      />
      <Field
        label="Sua Localização"
        value={u.location}
        onChangeText={(location) => app.updateUser({ location })}
        placeholder="Ex.: Maricá, Rio de Janeiro"
      />
      <Field
        label="Mora em"
        value={u.livesIn}
        onChangeText={(livesIn) => app.updateUser({ livesIn })}
        placeholder="Ex.: casa própria, com família..."
      />
      <Select
        label="Estado Civil"
        value={u.maritalStatus}
        options={FIELD_OPTIONS.maritalStatus}
        onSelect={(maritalStatus) => app.updateUser({ maritalStatus })}
      />
      <Select
        label="Filhos"
        value={u.children}
        options={FIELD_OPTIONS.children}
        onSelect={(children) => app.updateUser({ children })}
      />
      <Select
        label="Escolaridade / Formação Acadêmica"
        value={u.education}
        options={FIELD_OPTIONS.education}
        onSelect={(education) => app.updateUser({ education })}
      />
      <Field
        label="Profissão"
        value={u.profession}
        onChangeText={(profession) => app.updateUser({ profession })}
      />
      <Field
        label="Esportes"
        value={u.sports}
        onChangeText={(sports) => app.updateUser({ sports })}
        placeholder="Ex.: Corrida, Natação"
      />
      <Field
        label="Hobbies"
        value={u.hobbies}
        onChangeText={(hobbies) => app.updateUser({ hobbies })}
        placeholder="Ex.: Leitura, Música"
      />
      <Select
        label="Linguagem do Amor"
        value={u.loveLanguage}
        options={FIELD_OPTIONS.loveLanguage}
        onSelect={(loveLanguage) => app.updateUser({ loveLanguage })}
      />
    </Section>
  );
}

function AppearanceSection({ app }) {
  const u = app.user;
  return (
    <Section icon="✨" title="Aparência" subtitle={`${u.height}cm · ${u.bodyType || ''}`}>
      <Stepper
        label="Altura"
        value={u.height}
        suffix=" cm"
        min={130}
        max={220}
        onChange={(height) => app.updateUser({ height })}
      />
      <Stepper
        label="Peso"
        value={u.weight}
        suffix=" kg"
        min={40}
        max={200}
        onChange={(weight) => app.updateUser({ weight })}
      />
      <Select
        label="Tipo Físico"
        value={u.bodyType}
        options={FIELD_OPTIONS.bodyType.filter((o) => o !== 'Sem preferência')}
        onSelect={(bodyType) => app.updateUser({ bodyType })}
      />
      <Select
        label="Cor da Pele / Etnia"
        value={u.ethnicity}
        options={FIELD_OPTIONS.ethnicity}
        onSelect={(ethnicity) => app.updateUser({ ethnicity })}
      />
      <Select
        label="Cor do Cabelo"
        value={u.hairColor}
        options={FIELD_OPTIONS.hairColor}
        onSelect={(hairColor) => app.updateUser({ hairColor })}
      />
      <Select
        label="Tipo do Cabelo"
        value={u.hairType}
        options={FIELD_OPTIONS.hairType}
        onSelect={(hairType) => app.updateUser({ hairType })}
      />
      <Select
        label="Cor dos Olhos"
        value={u.eyeColor}
        options={FIELD_OPTIONS.eyeColor}
        onSelect={(eyeColor) => app.updateUser({ eyeColor })}
      />
    </Section>
  );
}

function LookingForSection({ app }) {
  const s = app.user.seeking || {};
  const set = (payload) => app.updateSeeking(payload);
  return (
    <Section icon="💍" title="Perfil que eu Busco" subtitle={s.relationshipType}>
      <Field
        label="Igreja / Denominação"
        value={s.church}
        onChangeText={(church) => set({ church })}
        placeholder="Ex.: Evangélica"
      />
      <Select
        label="Busco relacionamento"
        value={s.relationshipType}
        options={FIELD_OPTIONS.relationshipType}
        onSelect={(relationshipType) => set({ relationshipType })}
      />
      <Stepper
        label="Idade que Busco (mín)"
        value={s.minAge || 18}
        suffix=" anos"
        min={18}
        max={(s.maxAge || 80) - 1}
        onChange={(minAge) => set({ minAge })}
      />
      <Stepper
        label="Idade que Busco (máx)"
        value={s.maxAge || 80}
        suffix=" anos"
        min={(s.minAge || 18) + 1}
        max={80}
        onChange={(maxAge) => set({ maxAge })}
      />
      <Stepper
        label="Altura que Busco (mín)"
        value={s.minHeight || 130}
        suffix=" cm"
        min={130}
        max={(s.maxHeight || 220) - 1}
        onChange={(minHeight) => set({ minHeight })}
      />
      <Stepper
        label="Altura que Busco (máx)"
        value={s.maxHeight || 220}
        suffix=" cm"
        min={(s.minHeight || 130) + 1}
        max={220}
        onChange={(maxHeight) => set({ maxHeight })}
      />
      <Select
        label="Filhos"
        value={s.children}
        options={FIELD_OPTIONS.seekingChildren}
        onSelect={(children) => set({ children })}
      />
      <Select
        label="Tipo Físico"
        value={s.bodyType}
        options={FIELD_OPTIONS.bodyType}
        onSelect={(bodyType) => set({ bodyType })}
      />
      <Field
        label="Características que mais valorizo"
        value={s.valuedTraits}
        onChangeText={(valuedTraits) => set({ valuedTraits })}
        multiline
        placeholder="Ex.: Fé, família, bom humor"
      />
      <Field
        label="Outras características de quem eu busco"
        value={s.otherTraits}
        onChangeText={(otherTraits) => set({ otherTraits })}
        multiline
      />
      <Field
        label="Vamos nos dar bem se..."
        value={s.getAlong}
        onChangeText={(getAlong) => set({ getAlong })}
        multiline
        placeholder="Ex.: você amar a Deus acima de tudo"
      />
    </Section>
  );
}

// ---------- Tela principal ----------

export default function ProfileEditor() {
  const app = useApp();

  const confirmReset = () => {
    const question = 'Reiniciar MVP? Isso apaga login, matches, mensagens e desbloqueios locais.';
    if (Platform.OS === 'web') {
      if (window.confirm(question)) app.reset();
      return;
    }
    Alert.alert('Reiniciar MVP', 'Isso apaga matches, mensagens e desbloqueios locais.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Reiniciar', style: 'destructive', onPress: app.reset },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: spacing(2) }}>
        <View style={styles.card}>
          <Image source={{ uri: app.user.photo }} style={styles.avatar} />
          <Text style={styles.name}>
            {app.user.name}, {app.user.age}
          </Text>
          {app.authProvider && <Text style={styles.provider}>Entrou via {app.authProvider}</Text>}
        </View>

        <PhotosSection app={app} />
        <BioSection app={app} />
        <ReligionSection app={app} />
        <GeneralDataSection app={app} />
        <AppearanceSection app={app} />
        <LookingForSection app={app} />

        <Pressable style={styles.resetBtn} onPress={confirmReset}>
          <Text style={styles.resetText}>Sair e reiniciar dados locais do MVP</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: light.bg },
  card: {
    backgroundColor: light.card,
    borderRadius: radius.md,
    padding: spacing(2),
    marginBottom: spacing(2),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: light.accent,
  },
  name: { color: light.text, fontSize: 22, fontWeight: '900', textAlign: 'center', marginTop: 10 },
  provider: { color: light.textMuted, textAlign: 'center', marginTop: 4, fontSize: 12 },
  section: {
    backgroundColor: light.card,
    borderRadius: radius.md,
    marginBottom: spacing(1.5),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing(2),
    gap: spacing(1.5),
  },
  sectionIcon: { fontSize: 20 },
  sectionTitle: { color: light.text, fontWeight: '900', fontSize: 15 },
  sectionSubtitle: { color: light.textMuted, fontSize: 12, marginTop: 1 },
  sectionChevron: { color: light.textMuted, fontSize: 12 },
  sectionBody: {
    borderTopWidth: 1,
    borderTopColor: light.border,
    padding: spacing(2),
  },
  field: { marginBottom: spacing(1.5) },
  label: { color: light.textMuted, fontSize: 12, fontWeight: '700', marginBottom: 6 },
  input: {
    backgroundColor: light.bg,
    borderRadius: radius.sm,
    padding: spacing(1.5),
    color: light.text,
  },
  inputMultiline: { minHeight: 76, textAlignVertical: 'top' },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: light.bg,
    borderRadius: radius.sm,
    padding: spacing(1.5),
  },
  selectValue: { color: light.text, fontSize: 14 },
  selectChevron: { color: light.textMuted, fontSize: 11 },
  optionsList: {
    marginTop: 4,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: light.border,
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: spacing(1.5),
    backgroundColor: light.card,
    borderBottomWidth: 1,
    borderBottomColor: light.border,
  },
  optionActive: { backgroundColor: light.accent },
  optionText: { color: light.text, fontSize: 14 },
  optionTextActive: { color: '#fff', fontWeight: '700' },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing(1.5),
  },
  stepperLabel: { color: light.text, fontWeight: '700', fontSize: 13 },
  stepperControls: { flexDirection: 'row', alignItems: 'center', gap: spacing(1.5) },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: light.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: { color: light.text, fontSize: 16, fontWeight: '900' },
  stepperValue: { color: light.text, fontWeight: '800', minWidth: 64, textAlign: 'center' },
  inlineSave: {
    alignSelf: 'flex-end',
    backgroundColor: light.accent,
    borderRadius: radius.sm,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginTop: -spacing(0.5),
    marginBottom: spacing(1.5),
  },
  inlineSaveText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  smallBtn: {
    backgroundColor: light.accent,
    borderRadius: radius.sm,
    paddingHorizontal: spacing(2),
    justifyContent: 'center',
  },
  smallBtnText: { color: '#fff', fontWeight: '800' },
  coverPreview: { width: '100%', height: 100, borderRadius: radius.sm, marginBottom: spacing(1) },
  photoRow: { marginBottom: spacing(1.5) },
  photoItem: { marginRight: spacing(1) },
  photoThumb: { width: 74, height: 74, borderRadius: radius.sm },
  photoRemove: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: light.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoRemoveText: { color: '#fff', fontSize: 11, fontWeight: '900' },
  photoEmpty: { color: light.textMuted, fontSize: 13, paddingVertical: spacing(1.5) },
  warn: { color: light.accent, fontSize: 12 },
  moderation: { color: light.textMuted, fontSize: 12, marginTop: spacing(1) },
  photoBtns: { flexDirection: 'row', gap: spacing(1), justifyContent: 'flex-end' },
  uploadBtn: {
    alignSelf: 'flex-end',
    backgroundColor: light.text,
    borderRadius: radius.sm,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginTop: -spacing(0.5),
    marginBottom: spacing(1.5),
  },
  resetBtn: { alignItems: 'center', marginTop: spacing(3), paddingBottom: spacing(3) },
  resetText: { color: light.textMuted, fontSize: 12, textDecorationLine: 'underline' },
});
