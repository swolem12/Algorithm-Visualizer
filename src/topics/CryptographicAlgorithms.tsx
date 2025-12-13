import React, { useState, useEffect, useMemo } from "react";
import { GlowCard, CodeBlock, StatBadge } from "../components/FuturisticUI";

// Caesar Cipher Visualization
const CaesarCipherViz: React.FC = () => {
  const [plaintext, setPlaintext] = useState("HELLO");
  const [shift, setShift] = useState(3);

  const encrypt = (text: string, shift: number): string => {
    return text
      .toUpperCase()
      .split("")
      .map((char) => {
        if (char >= "A" && char <= "Z") {
          return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
        }
        return char;
      })
      .join("");
  };

  const ciphertext = encrypt(plaintext, shift);

  return (
    <GlowCard className="p-4 space-y-3" glowColor="amber">
      <h3 className="text-slate-50 text-sm font-semibold">Caesar Cipher (Substitution)</h3>

      <div className="space-y-2">
        <label className="block text-[11px] text-slate-400">Plaintext</label>
        <input
          type="text"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value.toUpperCase())}
          className="w-full px-3 py-2 bg-slate-900/70 border border-amber-500/30 rounded-lg text-amber-300 text-sm focus:outline-none focus:border-amber-500/60"
          placeholder="Enter text..."
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] text-slate-400">Shift Value: {shift}</label>
        </div>
        <input
          type="range"
          min={1}
          max={25}
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
      </div>

      <div className="p-3 bg-amber-500/5 border border-amber-500/30 rounded-lg">
        <div className="text-[10px] text-amber-400 mb-1">Ciphertext</div>
        <div className="text-lg font-mono font-bold text-amber-300 tracking-wider">
          {ciphertext}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <StatBadge label="Shift" value={shift} color="amber" />
        <StatBadge label="Length" value={plaintext.length} color="amber" />
      </div>

      <p className="text-[11px] text-slate-400 leading-snug">
        Caesar cipher shifts each letter by a fixed number. Easily broken by frequency analysis,
        but historically significant (used by Julius Caesar).
      </p>
    </GlowCard>
  );
};

// Hash Function Visualization
const HashViz: React.FC = () => {
  const [input, setInput] = useState("algorithm");

  // Simple hash function (demonstration only - not cryptographically secure)
  const simpleHash = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, "0").toUpperCase();
  };

  const hash = simpleHash(input);

  // Avalanche effect demonstration
  const modifiedInput = input.slice(0, -1) + (input.charAt(input.length - 1) === 'a' ? 'b' : 'a');
  const modifiedHash = simpleHash(modifiedInput);

  const differentBits = useMemo(() => {
    const h1 = parseInt(hash, 16);
    const h2 = parseInt(modifiedHash, 16);
    const xor = h1 ^ h2;
    return xor.toString(2).split('').filter(bit => bit === '1').length;
  }, [hash, modifiedHash]);

  return (
    <GlowCard className="p-4 space-y-3" glowColor="emerald">
      <h3 className="text-slate-50 text-sm font-semibold">Hash Functions & Avalanche Effect</h3>

      <div className="space-y-2">
        <label className="block text-[11px] text-slate-400">Input String</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3 py-2 bg-slate-900/70 border border-emerald-500/30 rounded-lg text-emerald-300 text-sm focus:outline-none focus:border-emerald-500/60"
          placeholder="Enter text..."
        />
      </div>

      <div className="space-y-2">
        <div className="p-3 bg-emerald-500/5 border border-emerald-500/30 rounded-lg">
          <div className="text-[10px] text-emerald-400 mb-1">Hash Output</div>
          <div className="text-sm font-mono font-bold text-emerald-300 tracking-wider break-all">
            {hash}
          </div>
        </div>

        <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
          <div className="text-[10px] text-slate-400 mb-1">
            Modified Input (last char changed)
          </div>
          <div className="text-xs font-mono text-slate-400 mb-2">{modifiedInput}</div>
          <div className="text-sm font-mono font-bold text-slate-300 tracking-wider break-all">
            {modifiedHash}
          </div>
        </div>
      </div>

      <StatBadge 
        label="Bits Changed" 
        value={`${differentBits}/32`} 
        color="emerald" 
      />

      <p className="text-[11px] text-slate-400 leading-snug">
        <strong className="text-emerald-400">Avalanche Effect:</strong> Small input changes produce
        drastically different hashes. This property ensures data integrity and prevents collision attacks.
      </p>
    </GlowCard>
  );
};

// XOR Encryption Visualization
const XOREncryptionViz: React.FC = () => {
  const [message, setMessage] = useState("SECRET");
  const [key, setKey] = useState("KEY");

  const xorEncrypt = (text: string, key: string): string => {
    const result = [];
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result.push(charCode.toString(16).padStart(2, '0').toUpperCase());
    }
    return result.join(' ');
  };

  const encrypted = xorEncrypt(message, key);

  return (
    <GlowCard className="p-4 space-y-3" glowColor="sky">
      <h3 className="text-slate-50 text-sm font-semibold">XOR Encryption (Stream Cipher)</h3>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="block text-[11px] text-slate-400">Message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value.toUpperCase())}
            className="w-full px-3 py-2 bg-slate-900/70 border border-sky-500/30 rounded-lg text-sky-300 text-sm focus:outline-none focus:border-sky-500/60"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-[11px] text-slate-400">Key</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value.toUpperCase())}
            className="w-full px-3 py-2 bg-slate-900/70 border border-sky-500/30 rounded-lg text-sky-300 text-sm focus:outline-none focus:border-sky-500/60"
          />
        </div>
      </div>

      <div className="p-3 bg-sky-500/5 border border-sky-500/30 rounded-lg">
        <div className="text-[10px] text-sky-400 mb-1">Encrypted (Hex)</div>
        <div className="text-sm font-mono font-bold text-sky-300 tracking-wider break-all">
          {encrypted}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <StatBadge label="Message Length" value={message.length} color="sky" />
        <StatBadge label="Key Length" value={key.length} color="sky" />
      </div>

      <p className="text-[11px] text-slate-400 leading-snug">
        XOR encryption: each message bit is XORed with a key bit. Symmetric (same key encrypts/decrypts).
        Secure only if key is random, never reused, and as long as message (one-time pad).
      </p>
    </GlowCard>
  );
};

// RSA Key Visualization (simplified)
const RSAViz: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { title: "1. Choose Primes", desc: "Select p = 61, q = 53", color: "purple" },
    { title: "2. Compute n", desc: "n = p × q = 3233", color: "sky" },
    { title: "3. Compute φ(n)", desc: "φ(n) = (p-1)(q-1) = 3120", color: "emerald" },
    { title: "4. Choose e, find d", desc: "Public key (e,n), Private key (d,n)", color: "amber" },
  ];

  return (
    <GlowCard className="p-4 space-y-3" glowColor="purple">
      <h3 className="text-slate-50 text-sm font-semibold">RSA Public-Key Cryptography</h3>

      <div className="grid grid-cols-2 gap-3">
        {steps.map((s, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg border transition-all ${
              step === i
                ? `bg-${s.color}-500/10 border-${s.color}-500/50`
                : "bg-slate-800/30 border-slate-700/50"
            }`}
          >
            <div className={`text-[10px] font-semibold mb-1 ${
              step === i ? `text-${s.color}-300` : "text-slate-500"
            }`}>
              {s.title}
            </div>
            <div className={`text-[11px] ${
              step === i ? "text-slate-300" : "text-slate-600"
            }`}>
              {s.desc}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-purple-500/5 border border-purple-500/30 rounded-lg space-y-2">
        <div className="text-[11px] text-purple-300">
          <strong>Public Key:</strong> Anyone can encrypt messages
        </div>
        <div className="text-xs font-mono text-purple-400/80">(e=17, n=3233)</div>
        
        <div className="text-[11px] text-purple-300 pt-2 border-t border-purple-500/20">
          <strong>Private Key:</strong> Only you can decrypt
        </div>
        <div className="text-xs font-mono text-purple-400/80">(d=2753, n=3233)</div>
      </div>

      <p className="text-[11px] text-slate-400 leading-snug">
        RSA security relies on the difficulty of factoring large numbers. Used in TLS/SSL,
        digital signatures, and secure communications. Modern keys use 2048+ bit primes.
      </p>
    </GlowCard>
  );
};

const CryptographicAlgorithms: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      <header className="space-y-3 border-b border-slate-800/50 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🔐</span>
          <div>
            <h1 className="text-slate-50 text-2xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-amber-300 to-emerald-300 bg-clip-text text-transparent">
                Cryptographic Algorithms
              </span>
            </h1>
            <p className="text-slate-400 text-sm">Securing Data Through Mathematics</p>
          </div>
        </div>
        <p className="text-slate-300 text-[13px] leading-relaxed max-w-4xl">
          Cryptography transforms information into secure ciphertexts, protecting confidentiality, integrity,
          and authenticity. From ancient ciphers to modern public-key systems, these algorithms underpin
          digital security, blockchain, and privacy technologies.
        </p>
      </header>

      <section className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CaesarCipherViz />
          <HashViz />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <XOREncryptionViz />
          <RSAViz />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlowCard className="p-4 space-y-3" glowColor="amber">
            <h3 className="text-slate-50 text-sm font-semibold">Cryptographic Primitives</h3>
            <ul className="space-y-2 text-[12px] text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-400">▸</span>
                <div><strong>Symmetric:</strong> AES, DES, ChaCha20 (same key encrypts & decrypts)</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400">▸</span>
                <div><strong>Asymmetric:</strong> RSA, ECC, ElGamal (public/private key pairs)</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">▸</span>
                <div><strong>Hash Functions:</strong> SHA-256, SHA-3, BLAKE2 (one-way)</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">▸</span>
                <div><strong>Digital Signatures:</strong> ECDSA, EdDSA, RSA signatures</div>
              </li>
            </ul>
          </GlowCard>

          <GlowCard className="p-4 space-y-3" glowColor="emerald">
            <h3 className="text-slate-50 text-sm font-semibold">Real-World Applications</h3>
            <ul className="space-y-2 text-[12px] text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✦</span>
                <div><strong>HTTPS/TLS:</strong> Secure web traffic, certificate validation</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-400">✦</span>
                <div><strong>Blockchain:</strong> Bitcoin, Ethereum use ECDSA, SHA-256</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✦</span>
                <div><strong>Password Storage:</strong> bcrypt, Argon2 (key derivation)</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">✦</span>
                <div><strong>VPNs:</strong> Secure tunnels using IPsec, WireGuard</div>
              </li>
            </ul>
          </GlowCard>
        </div>

        <GlowCard className="p-4 space-y-3" glowColor="sky">
          <h3 className="text-slate-50 text-sm font-semibold">AES Encryption (Rijndael)</h3>
          <CodeBlock language="typescript">
{`import { AES, enc } from 'crypto-js';

// Symmetric encryption with AES-256
function encryptData(plaintext: string, key: string): string {
  const encrypted = AES.encrypt(plaintext, key);
  return encrypted.toString();
}

function decryptData(ciphertext: string, key: string): string {
  const decrypted = AES.decrypt(ciphertext, key);
  return decrypted.toString(enc.Utf8);
}

// Example usage
const secret = "Sensitive Data";
const key = "my-secret-key-256-bits";
const cipher = encryptData(secret, key);
const recovered = decryptData(cipher, key);

console.log({ cipher, recovered }); // recovered === secret`}</CodeBlock>
        </GlowCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlowCard className="p-4 space-y-2" glowColor="amber">
            <h3 className="text-amber-300 text-sm font-semibold">Symmetric Encryption</h3>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• <strong>Fast:</strong> Efficient for bulk data encryption</li>
              <li>• <strong>Key Distribution:</strong> Challenge to share keys securely</li>
              <li>• <strong>AES-256:</strong> Current gold standard (256-bit keys)</li>
            </ul>
          </GlowCard>

          <GlowCard className="p-4 space-y-2" glowColor="sky">
            <h3 className="text-sky-300 text-sm font-semibold">Asymmetric Encryption</h3>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• <strong>Slow:</strong> Computationally intensive</li>
              <li>• <strong>Key Exchange:</strong> Solves distribution problem</li>
              <li>• <strong>Hybrid:</strong> Often combined with symmetric (TLS)</li>
            </ul>
          </GlowCard>

          <GlowCard className="p-4 space-y-2" glowColor="purple">
            <h3 className="text-purple-300 text-sm font-semibold">Post-Quantum Crypto</h3>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>• <strong>Threat:</strong> Quantum computers break RSA/ECC</li>
              <li>• <strong>Solutions:</strong> Lattice-based, hash-based schemes</li>
              <li>• <strong>NIST:</strong> Standardizing quantum-resistant algorithms</li>
            </ul>
          </GlowCard>
        </div>
      </section>
    </div>
  );
};

export default CryptographicAlgorithms;
