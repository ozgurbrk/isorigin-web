import {
  Crown,
  Youtube,
  Swords,
  MessageCircle,
  Instagram,
  Music2,
  Twitch,
  Send,
  Link as LinkIcon,
  Gamepad2,
  Mail,
  type LucideIcon,
} from "lucide-react";

/**
 * İsme göre ikon eşlemesi. DB'de string olarak saklanan icon alanını
 * Lucide bileşenine çevirir. Bazı markaların (Discord/TikTok/WhatsApp/Kick)
 * Lucide karşılığı olmadığından en yakın jenerik ikon kullanılır.
 */
const map: Record<string, LucideIcon> = {
  crown: Crown,
  youtube: Youtube,
  swords: Swords,
  discord: MessageCircle,
  whatsapp: MessageCircle,
  tiktok: Music2,
  instagram: Instagram,
  twitch: Twitch,
  kick: Gamepad2,
  send: Send,
  mail: Mail,
  link: LinkIcon,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? LinkIcon;
  return <Cmp className={className} />;
}
